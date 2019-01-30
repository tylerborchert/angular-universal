# Componer Explorer

This application harnesses server side rendering with Angular Universal to deliver compiled Angular components via a simple REST web service.

For example doing a `GET /dummy-title` will return:

```
{
  compiled: '<iframe src="localhost:4000/dummy-title?rendered"></iframe>',
  templateSrc: 'source code of the components template',
  componentSrc: 'source code of the components class definition',
  propsTable: json of the components props
}
```

The `propsTable` json structure looks like:
```
{
  inputs: [ { key: 'title', default: 'hello world!', type: 'string', description: 'The title of the component' }, ... ]
}
```

The `inputs` field defines a components Inputs. The key field is the name of the input, the default field is what value this input will have when it is rendered server side, the type is the data type, and the description is a brief explination of what this input is used for

The REST routes are mapped to the name of each component, so making the request `GET /example`, will search for the contents of `components/example` and attempt to render whatever is found in `components/example/example.component.ts` using the values of `components/example/props.json`. Your application must follow this directory structure in order for this service to properly work. 

## How to install

Project uses Angular CLI 7

`npm install` then `npm run dev`
