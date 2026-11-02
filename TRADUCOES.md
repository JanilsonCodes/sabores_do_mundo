# Traduções do site

O site usa `config.json` como fonte de traduções. Idiomas: `pt`, `en`, `fr` e `ja`.

As páginas HTML foram ligadas às chaves com `data-i18n`. Placeholders e atributos acessíveis usam `data-i18n-placeholder` e `data-i18n-aria-label`. O JavaScript aplica as traduções ao carregar e ao mudar o idioma.

O menu mantém as traduções próprias de categorias, pratos e descrições dentro de `menu`.

Para testar, execute o projeto através de um servidor HTTP (por exemplo Live Server); não abra os HTML diretamente com `file://`, porque `fetch('config.json')` precisa de servidor.
