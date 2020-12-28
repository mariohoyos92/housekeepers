module.exports = plop => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/Component.hbs",
      },
      {
        type: "add",
        path: "components/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "plop-templates/Component.test.hbs",
      },
      {
        type: "add",
        path: "components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "plop-templates/Component.stories.hbs",
      },
      {
        type: "add",
        path: "components/{{pascalCase name}}/index.ts",
        template: `export { default } from "./{{pascalCase name}}";\n`,
      },
    ],
  });
};
