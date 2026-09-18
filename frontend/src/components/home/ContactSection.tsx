import type { FormEvent } from 'react'
import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { Button } from '../ui/Button'

const EMAIL = 'mohammedrayaan1@gmail.com'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export function ContactSection() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const next: Errors = {}

    if (!name.trim()) {
      next.name = 'Please enter your name.'
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = 'Please enter a valid email.'
    }

    if (message.trim().length < 12) {
      next.message = 'Please add a little more context.'
    }

    setErrors(next)

    if (Object.keys(next).length > 0) {
      setStatus('idle')
      return
    }

    const subject = `Portfolio contact from ${name.trim()}`
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`

    const mailtoUrl =
      `mailto:${EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(EMAIL)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    // Try the visitor's default email client first.
    window.location.href = mailtoUrl

    // Give the browser a moment, then provide Gmail as a fallback.
    window.setTimeout(() => {
      setStatus('success')
      window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    }, 900)
  }

  return (
    <section
      id="contact"
      className="section-block contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="section-heading contact-heading">
          <div className="section-index">04</div>

          <div className="section-heading-copy">
            <p className="eyebrow">Contact</p>

            <p className="contact-lede">
              Have a role, a product problem or a good technical question?
            </p>

            <p className="section-description">
              The form opens your email client directly. No pretend backend,
              no silent form submission.
            </p>
          </div>
        </div>

        <div
          ref={ref}
          className={`contact-layout reveal ${visible ? 'is-visible' : ''}`}
        >
          <div className="contact-intro">
            <h2 id="contact-title" className="contact-big">
              Let's talk about what needs building.
            </h2>
          </div>

          <form
            className="contact-form contact-form--aligned"
            onSubmit={submit}
            noValidate
          >
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
            />

            {errors.name ? (
              <span className="field-error">{errors.name}</span>
            ) : null}

            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
            />

            {errors.email ? (
              <span className="field-error">{errors.email}</span>
            ) : null}

            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              aria-invalid={Boolean(errors.message)}
            />

            {errors.message ? (
              <span className="field-error">{errors.message}</span>
            ) : null}

            <Button type="submit">
              Open email draft ↗
            </Button>

            {status === 'success' ? (
              <p className="form-status">
                Your email draft should now be open. Hit send there to reach me.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}