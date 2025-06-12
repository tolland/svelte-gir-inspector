import {
  Box as ClassIcon,
  Box as InterfaceIcon,
  Box as RecordIcon,
  Box as EnumIcon,
  Box as AliasIcon,
  Box as PropertyIcon,
  Box as MemberIcon,
  CircleArrowRight as MethodIcon,
  CircleArrowRight as FunctionIcon,
  CodeXml as CodeXmlIcon,
  Pi as ConstantIcon,
  Radio as SignalIcon,
  Tag as FieldIconIcon,
  Webhook as CallbackIcon
} from '@lucide/svelte';

// import {CodeBracketIcon, CogIcon, CubeIcon, FileIcon, ListBulletIcon, SpeakerWaveIcon, TagIcon} from './icons';

export function getIcon(typeLabel: string) {
  switch (typeLabel) {
    case 'Namespace':
      return CodeXmlIcon;
    case 'Class':
      return ClassIcon;
    case 'Interface':
      return InterfaceIcon;
    case 'Record':
      return RecordIcon;
    case 'Enum':
      return EnumIcon;
    case 'Alias':
      return AliasIcon;
    case 'Method':
      return MethodIcon;
    case 'Function':
      return FunctionIcon;
    case 'Property':
      return PropertyIcon;
    case 'Field':
      return FieldIconIcon;
    case 'Signal':
      return SignalIcon;
    case 'Callback':
      return CallbackIcon;
    case 'Constant':
      return ConstantIcon;
    case 'Member':
      return MemberIcon;
    default:
      return EnumIcon;
  }
}

//
// export const getIconForTypeString = (type: string): string => {
//   switch (type.toLowerCase()) {
//     case 'namespace':
//       return CodeBracketIcon("text-gray-700");
//     case 'class':
//     case 'interface':
//     case 'record':
//       return CubeIcon("text-sky-600");
//     case 'function':
//     case 'method':
//     case 'constructor':
//     case 'callback':
//       return CogIcon("text-green-600");
//     case 'enum':
//       return ListBulletIcon("text-orange-600");
//     case 'property':
//     case 'field':
//     case 'constant':
//     case 'alias':
//       return TagIcon("text-indigo-600");
//     case 'signal':
//       return SpeakerWaveIcon("text-red-600");
//     default:
//       return FileIcon("text-slate-500");
//   }
// };
