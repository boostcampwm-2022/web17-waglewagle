enum listeningEvent {
  select_keyword = 'select_keyword',
  deselect_keyword = 'deselect_keyword',
  delete_keyword = 'delete_keyword',
  create_thread = 'create_thread',
  delete_thread = 'delete_thread',
}

enum emittingEvent {
  keyword_selected = 'keyword_selected',
  keyword_deselected = 'keyword_deselected',
  keyword_deleted = 'keyword_deleted',
  thread_created = 'thread_created',
  thread_deleted = 'thread_deleted',
}

export { listeningEvent, emittingEvent };
