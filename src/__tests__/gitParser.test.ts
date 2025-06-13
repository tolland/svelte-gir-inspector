import { parseGirContent } from '../services/girParser.ts';

describe('parseGirContent', () => {
  it('parses a valid GIR XML string with a repository element', () => {
    const xmlString = `
      <repository xmlns="http://www.gtk.org/introspection/core/1.0">
        <namespace name="TestNamespace" version="1.0">
          <class name="TestClass" />
        </namespace>
      </repository>
    `;
    const result = parseGirContent(xmlString, 'testFile');
    expect(result.namespaces).toHaveLength(1);
    expect(result.namespaces[0].name).toBe('TestNamespace');
    expect(result.namespaces[0].classes).toHaveLength(1);
    expect(result.namespaces[0].classes[0].name).toBe('TestClass');
  });

  it('throws an error if the XML string is missing the repository element', () => {
    const xmlString = `<invalidRoot></invalidRoot>`;
    expect(() => parseGirContent(xmlString, 'testFile')).toThrow('Invalid GIR file: Missing <repository> root element.');
  });

  it('throws an error if the XML string contains a parser error', () => {
    const xmlString = `<repository><namespace></repository>`;
    expect(() => parseGirContent(xmlString, 'testFile')).toThrow(/Invalid GIR file: XML parsing error/);
  });

  it('parses a repository with multiple namespaces', () => {
    const xmlString = `
      <repository xmlns="http://www.gtk.org/introspection/core/1.0">
        <namespace name="Namespace1" version="1.0" />
        <namespace name="Namespace2" version="2.0" />
      </repository>
    `;
    const result = parseGirContent(xmlString, 'testFile');
    expect(result.namespaces).toHaveLength(2);
    expect(result.namespaces[0].name).toBe('Namespace1');
    expect(result.namespaces[1].name).toBe('Namespace2');
  });

  it('parses a namespace with various elements', () => {
    const xmlString = `
      <repository xmlns="http://www.gtk.org/introspection/core/1.0">
        <namespace name="TestNamespace" version="1.0">
          <class name="TestClass" />
          <function name="TestFunction" />
          <constant name="TestConstant" value="42" />
        </namespace>
      </repository>
    `;
    const result = parseGirContent(xmlString, 'testFile');
    const namespace = result.namespaces[0];
    expect(namespace.classes).toHaveLength(1);
    expect(namespace.functions).toHaveLength(1);
    expect(namespace.constants).toHaveLength(1);
    expect(namespace.classes[0].name).toBe('TestClass');
    expect(namespace.functions[0].name).toBe('TestFunction');
    expect(namespace.constants[0].name).toBe('TestConstant');
    expect(namespace.constants[0].value).toBe('42');
  });

  it('handles namespaces with missing optional attributes gracefully', () => {
    const xmlString = `
      <repository xmlns="http://www.gtk.org/introspection/core/1.0">
        <namespace name="TestNamespace">
          <class name="TestClass" />
        </namespace>
      </repository>
    `;
    const result = parseGirContent(xmlString, 'testFile');
    const namespace = result.namespaces[0];
    expect(namespace.version).toBeUndefined();
    expect(namespace.classes[0].name).toBe('TestClass');
  });
});
