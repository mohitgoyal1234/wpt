// Since this is a manual test, disable the automatic timeout.
setup({explicit_timeout: true, explicit_done: true});

// Redirect to https if using http, because File System Access API (previously
// Native FileSystem API) isn't supported in http.
if (location.protocol !== 'https:') {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}

test(function() {
  assert_true('serviceWorker' in navigator);
}, 'serviceWorker exists')

navigator.serviceWorker.register(
    'file_handlers-member-manual-service-worker.js');

test(function() {
  assert_true('launchQueue' in window);
}, 'File Handling API enabled');

test(function() {
  assert_true('showOpenFilePicker' in window);
}, 'File System Access API enabled');

window.launchQueue.setConsumer(async launchParams => {
  promise_test(async t => {
    assert_equals(launchParams.files.length, 1, 'Wrong number of files found');

    const readHandle = await launchParams.files[0].getFile();
    assert_equals(readHandle.name, 'file_handlers-sample-file.txt');

    const fileContents = await readHandle.text();
    assert_equals(fileContents, 'File handling WPT - Hello woorld!\n');
  }, 'launchQueue works as expected');
  done();
});
