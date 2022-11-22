enum listeningEvent {
  create_keyword = 'create_keyword',
  select_keyword = 'select_keyword',
  deselect_keyword = 'deselect_keyword',
  delete_keyword = 'delete_keyword',
  create_thread = 'create_thread',
  delete_thread = 'delete_thread',
}

enum emittingEvent {
  keyword_created = 'keyword_created',
  keyword_selected = 'keyword_selected',
  keyword_deselected = 'keyword_deselected',
  keyword_deleted = 'keyword_deleted',
  thread_created = 'thread_created',
  thread_deleted = 'thread_deleted',

  create_keyword_response = 'create_keyword_response',
  select_keyword_response = 'select_keyword_response',
  keyword_deselected_response = 'keyword_deselected_response',
  delete_keyword_response = 'delete_keyword_response',
  create_thread_response = 'create_thread_response',
  delete_thread_response = 'delete_thread_response',
}

export { listeningEvent, emittingEvent };
