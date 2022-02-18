import React from 'react';
import ArrowTextLink from '@/shared/components/ArrowTextLink';

const WabikenMenu: React.FC = () => (
  <div>
    <div>
      <ArrowTextLink href="/entry/flow" text="購入したシリアルコードの登録" />
    </div>
    <div>
      <ArrowTextLink
        href="https://www.amazon.co.jp/%E3%82%A2%E3%83%80%E3%83%AB%E3%83%88-DVD/b/ref=amb_link_ZkQehEtaPFKe33Nuo8yX0w_32?ie=UTF8&node=896246&redirect=true&rw_useCurrentProtocol=1"
        text="ストア"
        target="_blank"
      />
    </div>
  </div>
);

export default WabikenMenu;
