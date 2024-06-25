'use client';

import { useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { ContainerLayout, Terms } from '@/components';
import { useNavTitleStore, useMenuStore, useHeadersStore } from '@/store';

export default function Legal() {
  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const host = useHeadersStore((state) => state.host);

  useEffect(() => {
    updateTitle('Términos y condiciones');
    setCurrentItem('terms');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/legal`,
        page_title: 'Yiro :: terminosYCondiciones',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: terminosYCondiciones',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  return (
    <ContainerLayout fullWidth>
      <Terms />
    </ContainerLayout>
  );
}
