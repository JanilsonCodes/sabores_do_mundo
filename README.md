# Sushi Sabores do Mundo — Website

Website estático, responsivo e multilíngue para o restaurante Sushi Sabores do Mundo, do Chef José Centeio (Guto).

## Executar localmente

O site carrega `config.json` com `fetch`, por isso não deve ser aberto diretamente com `file://`.

1. Instale Python 3 (ou utilize a extensão Live Server do VS Code).
2. Abra a pasta do projeto no terminal.
3. Execute:

```bash
python -m http.server 8000
```

4. Abra http://localhost:8000.

Não existe backend, base de dados, autenticação, Supabase ou Firebase.

## Configuração central — config.json

- `restaurant`: nome, chef, morada, telefone, WhatsApp, email, Google Maps, coordenadas, redes sociais e horário.
- `tables`: identificador, lugares, ordem, estado ativo e indicação `demo`.
- `menu.categories` e `menu.items`: categorias, pratos, descrições, ingredientes, preços, imagens e estado ativo.
- `texts`: traduções da interface em português (`pt`), inglês (`en`), francês (`fr`) e japonês (`ja`).
- `media`: caminhos das imagens e do vídeo.

### WhatsApp

Altere `restaurant.whatsapp` para o número completo com indicativo internacional, apenas dígitos (ex.: indicativo + número, sem `+`, espaços ou hífen). O valor demonstrativo deve ser substituído antes de publicar.

### Mesas

As quatro mesas incluídas são **demonstrativas**, não representam a capacidade real do restaurante. Substitua/remova os registos em `tables` pelos dados reais. `active:false` oculta uma mesa. O website não consulta disponibilidade: a equipa verifica manualmente no WhatsApp. A reserva só fica confirmada após resposta do restaurante.

### Menu

Adicione objetos a `menu.categories` e `menu.items`. Não foram inventados pratos ou preços. Exemplo de prato:

```json
{
  "id": "prato-exemplo",
  "category": "sushi",
  "name": {"pt": "Nome do prato", "en": "Dish name", "fr": "Nom du plat", "ja": "料理名"},
  "description": {"pt": "Descrição fornecida pelo restaurante"},
  "ingredients": [],
  "price": "PREENCHER_PRECO",
  "image": "public/images/nome-do-prato.webp",
  "active": true
}
```

## Fotografias e vídeos

O `index.html` original contém três fotografias incorporadas como JPEG em Base64. Este pacote contém os caminhos de destino preparados:
- `public/images/fotografia-original-1.webp`
- `public/images/fotografia-original-2.webp`
- `public/images/fotografia-original-3.webp`

**Limitação desta entrega:** não foi possível transferir os bytes dos anexos para o ambiente de criação do ZIP; por isso, as três fotografias originais não foram extraídas nem convertidas. Não foram substituídas por imagens aleatórias. Reabra o `index.html` original e extraia os `data:image/jpeg;base64,...` para os três ficheiros acima, convertendo-os para WebP com uma ferramenta de imagem. Os caminhos já estão ligados às páginas.

Novos conteúdos preparados:
- `public/video_1.mp4` — degustação de Onigiri com Chef Muira e Chef José Centeio (Guto).
- `public/images/img_2.webp` — equipa de rádio/televisão de Tóquio e Chef Muira durante formação de Onigiri.
- `public/images/img_3.webp` — imagem relacionada com o crítico gastronómico japonês Mitsutani.

Coloque os ficheiros reais nesses caminhos. O vídeo e as novas imagens não foram fornecidos como anexos nesta conversa.

## SEO e publicação

Cada página inclui título, meta description, Open Graph, idioma e estrutura semântica básica. Antes de publicar, configure um domínio canónico, redes sociais, contacto e horários reais. Não foram adicionados dados estruturados com avaliações, preços ou horários não confirmados.

## Páginas

- `index.html` — início
- `historia.html` — história e percurso profissional
- `chef.html` — Chef Guto
- `japao.html` — formação, Japão, Onigiri, vídeo e testemunho
- `menu.html` — menu editável via JSON
- `reservas.html` — seleção visual de mesa e pedido pelo WhatsApp
- `contacto.html` — mapa e contactos
