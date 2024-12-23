import { ConfigProvider } from 'antd'
import React from 'react'

import { ReactNode } from 'react';

const ProviderAntd = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider theme={{
      cssVar: false,
      hashed: false,
      components: {
        Layout: { headerBg: '#fff9f9', footerBg: '#EAE9E9' }
        // Button:{
        // primaryColor

        // }
      }

    }}
    layout={{
      style: {
        // background: 'red'
      }

    }}

    >
      {children}
    </ConfigProvider>
  )
}

export default ProviderAntd
