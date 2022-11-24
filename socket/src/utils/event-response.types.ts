import { emittingEvent } from './event.enum';

interface emittingEventOutput {
  [emittingEvent.keyword_selected]: {};
  [emittingEvent.keyword_deselected]: {};
  [emittingEvent.keyword_deleted]: {};
  [emittingEvent.thread_deleted]: {};
}
