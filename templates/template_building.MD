## How to build a template

A template folder should contain 3 elements:

1. **A `metadata.json` file** with the following structure:

```JSON
{
    "name": string,
    "version": string,
    "description": string,
    "authors": string,
    "image": string,
    "tags": string
}
```

2. **A `files` folder**: all the folders and files in this folder will correspond to a file or folder in the project, the files can have a `.hbs` extension in wich case this will be parsed as a `Handlebars` template. The files that do not ends with this extention will be copy exactly.
The files and folders names also support basic `Handlebars` notation replacin the `/` in the closing tags for a `#` to avoid collition with paths standars. an example of this is here: `templates/nextjs/files/web_client/src/utils/{{#each instructions}}{{name}}{{#each}}.ts.hbs`

3. **A `helpers` folder** That can contain Rhai scripts that can be used on the template files.