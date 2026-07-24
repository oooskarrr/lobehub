import { PanelRightOpen } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useChatStore } from '@/store/chat';
import { threadSelectors } from '@/store/chat/selectors';

import { defineAction } from '../defineAction';

export const viewThreadAction = defineAction({
  key: 'viewThread',
  useBuild: (ctx) => {
    const { t } = useTranslation('common');
    const thread = useChatStore((s) => threadSelectors.getThreadsBySourceMsgId(ctx.id)(s)[0]);
    const openThreadInPortal = useChatStore((s) => s.openThreadInPortal);

    return useMemo(
      () =>
        thread
          ? {
              handleClick: () => openThreadInPortal(thread.id, ctx.id),
              icon: PanelRightOpen,
              key: 'viewThread',
              label: t('viewExecutionDetails'),
            }
          : null,
      [ctx.id, openThreadInPortal, t, thread],
    );
  },
});
