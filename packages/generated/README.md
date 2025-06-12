# generated from the rnc file

the gobject introspection publish a relax compact schema for gir xml. This is an attempt to
generate typescript types using the following steps

1. convert <https://github.com/GNOME/gobject-introspection/blob/main/docs/gir-1.2.rnc> to relax ng format
2. generate typescript from the rng schema

compact to rng

- <https://github.com/relaxng/jing-trang>

Relax to typescript

- <https://github.com/siefkenj/relax-ng-to-typescript>
