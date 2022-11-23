import { emittingEvent } from './event.enum';

interface emittingEventOutput {
  [emittingEvent.keyword_selected]: {};
  [emittingEvent.keyword_deselected]: {};
  [emittingEvent.keyword_deleted]: {};
  [emittingEvent.thread_deleted]: {};

  [emittingEvent.select_keyword_response]: {};
  [emittingEvent.keyword_deselected_response]: {};
  [emittingEvent.delete_keyword_response]: {};
  [emittingEvent.delete_thread_response]: {};
}
