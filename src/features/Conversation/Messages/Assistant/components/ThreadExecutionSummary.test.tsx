import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ThreadExecutionSummary from './ThreadExecutionSummary';

const mocks = vi.hoisted(() => ({
  openThreadInPortal: vi.fn(),
  threads: [
    {
      id: 'thread-1',
      sourceMessageId: 'message-1',
    },
  ],
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => '查看执行详情' }),
}));

vi.mock('@/store/chat', () => ({
  useChatStore: (selector: (state: unknown) => unknown) =>
    selector({ openThreadInPortal: mocks.openThreadInPortal, threads: mocks.threads }),
}));

vi.mock('@/store/chat/selectors', () => ({
  threadSelectors: {
    getThreadsBySourceMsgId: (messageId: string) => (state: { threads: typeof mocks.threads }) =>
      state.threads.filter((thread) => thread.sourceMessageId === messageId),
  },
}));

describe('ThreadExecutionSummary', () => {
  beforeEach(() => {
    mocks.openThreadInPortal.mockReset();
  });

  it('opens the linked Thread from the persistent content-level action', () => {
    render(<ThreadExecutionSummary messageId="message-1" />);

    fireEvent.click(screen.getByRole('button', { name: '查看执行详情' }));

    expect(mocks.openThreadInPortal).toHaveBeenCalledWith('thread-1', 'message-1');
  });
});
