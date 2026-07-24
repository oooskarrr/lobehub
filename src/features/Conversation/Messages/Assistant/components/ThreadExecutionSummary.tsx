import { Text } from '@lobehub/ui';
import { createStaticStyles } from 'antd-style';
import { ChevronRight } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useChatStore } from '@/store/chat';
import { threadSelectors } from '@/store/chat/selectors';

const styles = createStaticStyles(({ css, cssVar }) => ({
  button: css`
    cursor: pointer;

    display: inline-flex;
    gap: 4px;
    align-items: center;

    width: fit-content;
    padding-block: 4px;
    padding-inline: 4px;
    border: 0;
    border-radius: ${cssVar.borderRadiusSM};

    font: inherit;
    color: ${cssVar.colorTextSecondary};

    background: transparent;

    transition:
      color 150ms ease-out,
      background-color 150ms ease-out;

    &:hover {
      color: ${cssVar.colorText};
      background: ${cssVar.colorFillTertiary};
    }

    &:focus-visible {
      outline: 2px solid ${cssVar.colorPrimary};
      outline-offset: 2px;
    }
  `,
}));

interface ThreadExecutionSummaryProps {
  messageId: string;
}

/**
 * Persistent content-level affordance for a projected Agent reply.
 * Execution details belong to the reply narrative, not its transient action bar.
 */
const ThreadExecutionSummary = memo<ThreadExecutionSummaryProps>(({ messageId }) => {
  const { t } = useTranslation('common');
  const thread = useChatStore((s) => threadSelectors.getThreadsBySourceMsgId(messageId)(s)[0]);
  const openThreadInPortal = useChatStore((s) => s.openThreadInPortal);

  const handleClick = useCallback(() => {
    if (!thread) return;
    openThreadInPortal(thread.id, messageId);
  }, [messageId, openThreadInPortal, thread]);

  if (!thread) return null;

  return (
    <button
      aria-label={t('viewExecutionDetails')}
      className={styles.button}
      type="button"
      onClick={handleClick}
    >
      <Text as={'span'} type={'secondary'}>
        {t('viewExecutionDetails')}
      </Text>
      <ChevronRight aria-hidden size={14} />
    </button>
  );
});

ThreadExecutionSummary.displayName = 'ThreadExecutionSummary';

export default ThreadExecutionSummary;
