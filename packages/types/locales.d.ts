export interface LocaleData {
  error: {
    notFound: {
      title: string;
      text: string;
      home: string;
    };
    unexpected: {
      title: string;
      text: string;
      home: string;
    };
  };
  helloero: {
    menus: {
      settings: string;
      login: string;
      logout: string;
      help: string;
      terms: string;
      support: string;
    };
    top: {
      lead: string;
      description: string;
      button: string;
    };
    myLibrary: {
      wabiken: {
        title: string;
        entry: string;
        store: string;
      };
      filter: {
        search: string;
      };
      purchased: {
        title: string;
        detail: string;
        watch: string;
      };
    };
    entry: {
      input: {
        title: string;
        text: string;
        serial: string;
        button: string;
      };
      confirm: {
        title: string;
        text: string;
        button: string;
      };
      complete: {
        title: string;
        text: string;
        home: string;
      };
    };
  };
}
