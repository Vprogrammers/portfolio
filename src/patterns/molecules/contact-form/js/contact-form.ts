// Validates in place, then sends through Web3Forms when an access key is set, or
// falls back to the visitor's mail app with the message already written.
document.querySelectorAll<HTMLFormElement>('.js-contact-form').forEach((form) => {
  const status = form.querySelector<HTMLElement>('.m-contact-form__status');
  const submit = form.querySelector<HTMLButtonElement>('.m-contact-form__submit');
  const { email, accessKey } = form.dataset;

  const say = (text: string, kind: 'ok' | 'error' | '') => {
    if (!status) return;
    status.textContent = text;
    status.dataset.kind = kind;
  };

  const viaMailApp = (data: FormData) => {
    const subject = `Project enquiry from ${data.get('name')}`;
    const body = `${data.get('message')}\n\n${data.get('name')} · ${data.get('email')}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    say('Your mail app should open with the message ready to send.', 'ok');
  };

  const busy = (value: boolean) => { if (submit) submit.disabled = value; };

  const viaService = async (data: FormData) => {
    data.append('access_key', accessKey ?? '');
    data.append('subject', `Portfolio enquiry from ${data.get('name')}`);
    busy(true);
    say('Sending…', '');
    try {
      const response = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      say('Thank you, your message is on its way. I will reply soon.', 'ok');
    } catch {
      say(`Sorry, that did not go through. Please write to ${email}.`, 'error');
    }
    busy(false);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    if (data.get('botcheck')) return;
    if (accessKey) viaService(data);
    else viaMailApp(data);
  });
});
