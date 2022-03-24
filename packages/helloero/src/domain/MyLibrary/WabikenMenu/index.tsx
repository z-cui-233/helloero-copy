import React from 'react';
import ArrowTextLink from '@/shared/components/ArrowTextLink';

const WabikenMenu: React.FC = () => (
  <div>
    <div>
      <ArrowTextLink href="/entry/flow" text="購入したシリアルコードの登録" />
    </div>
    {/* <div>
      <ArrowTextLink
        href="https://www.amazon.co.jp/b?node=5378643051"
        text="ストア"
        target="_blank"
      />
    </div> */}
  </div>
);

export default WabikenMenu;
