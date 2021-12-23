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
  messages: {
    default: string;
    getWabikenMeta: {
      400001: string;
      404000: string;
    };
    activateWabiken: {
      400001: string;
      404000: string;
      400102: string;
      409002: string;
    };
    getPlayInfo: {
      400001: string; // パラメーターエラー
      400102: string; // wabikenの有効期間外（期限切れ、有効期間前）
      400103: string; // リフレッシュトークンの期限が切れた
      400104: string; // 視聴可能回数は足りない
      400105: string; // wabikenまだアクティベートしません
      403002: string; // wabikenは他人にロックされてる
      404000: string; // 存在しないwabiken
    };
  };
  account: {
    meta: {
      default: {
        title: string;
        description: string;
      };
      login: {
        title: string;
        description: string;
      };
      logout: {
        title: string;
        description: string;
      };
      updateEmail: {
        title: string;
        description: string;
      };
    };
    menus: {
      login: string;
      helloero: string;
      account: string;
      help: string;
      logout: string;
    };
    logout: {
      title: string;
      text: string;
      button: string;
      cancel: string;
    };
    updateEmail: {
      email: {
        title: string;
        text: string;
        email: string;
        button: string;
      };
      verification: {
        title: string;
        text: string;
        code: string;
        button: string;
      };
      complete: {
        title: string;
        text: string;
        home: string;
      };
    };
  };
  helloero: {
    meta: {
      default: {
        title: string;
        description: string;
      };
      entry: {
        title: string;
        description: string;
      };
    };
    menus: {
      settings: string;
      login: string;
      logout: string;
      account: string;
      help: string;
      helpcenter: string;
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
  help: {
    meta: {
      default: {
        title: string;
        description: string;
      };
    };
  };
}
