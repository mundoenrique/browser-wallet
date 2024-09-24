'use client';

import { useRef } from 'react';
import { useHeadersStore } from '@/store';
import { Avatar, Box, Button, Card } from '@mui/material';
import ShareIcon from '@mui/icons-material/ShareOutlined';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { CardTicketProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';
import CheckCircleIcon from '%/images/arts/CheckCircleIcon';
import { handleDownload, handleShare } from '@/utils/toolHelper';

/**
 * Card used to display the generated result
 *
 * @param children - Child elements.
 * @param textBotton - Button text when in ticket form.
 * @param download - Handle image download.
 * @param shared - Handles the action of sharing an image.
 * @param onClick - Action handling for a button.
 */
export default function CardTicket(props: CardTicketProps) {
  const { children, textBotton, download, shared, onClick } = props;
  const componentRef = useRef<any>(null);
  const shareData: any = { files: [] };

  const host = useHeadersStore((state) => state.host);

  const handleShareClick = () => {
    handleShare(componentRef.current, shareData, fuchsiaBlue[50]);

    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: transferencia :: operacionExitosa',
        previous_section: 'Yiro :: transferencia :: monto',
        selected_content: 'Compartir',
        destination_page: `${host}/dashboard/transfer`,
      },
    });
  };

  const handleDownloadClick = () => {
    handleDownload(componentRef.current, 'comprobante.png', fuchsiaBlue[50]);

    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: pagarDeuda :: operacionExitosa',
        previous_section: 'Yiro :: pagarDeuda :: monto',
        selected_content: 'Guardar',
        destination_page: `${host}/dashboard/debt`,
      },
    });
  };

  return (
    <Box sx={{ padding: '24px 4px 4px 4px', position: 'relative', mb: 3 }}>
      <Avatar
        sx={{
          bgcolor: fuchsiaBlue[50],
          position: 'absolute',
          top: '19px',
          left: '127px',
          zIndex: 2,
          width: 67,
          height: 67,
        }}
        variant="circular"
      >
        <CheckCircleIcon />
      </Avatar>
      <Card
        ref={componentRef}
        sx={{
          bgcolor: fuchsiaBlue[50],
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          pt: 7,
          px: 2,
          pb: 3 / 2,
          mask: 'radial-gradient(15px at 20px 100%, #0000 98%, #000) -20px',
        }}
      >
        {children}
      </Card>
      <Card
        sx={{
          bgcolor: fuchsiaBlue[50],
          borderRadius: '16px',
          borderTop: `2px dashed ${fuchsiaBlue[800]}`,
          borderTopWidth: '1px',
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          py: 3,
          mb: 3 / 2,
          gap: 3,
          mask: 'radial-gradient(15px at 20px 0, #0000 98%, #000) -20px',
        }}
      >
        {shared && (
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={handleDownloadClick}
            sx={{ minWidth: 52, '&> span': { mr: 0 } }}
          />
        )}

        {onClick && (
          <Button variant="contained" fullWidth onClick={onClick}>
            {textBotton}
          </Button>
        )}

        {download && (
          <Button variant="contained" fullWidth onClick={handleDownloadClick}>
            {textBotton}
          </Button>
        )}
      </Card>
    </Box>
  );
}
