import type { FormEvent } from 'react'
import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

const EMAIL = 'mohammedrayaan1@gmail.com'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export function ContactSection() {
  const { ref, visible } = useReveal<HTMLElement>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const next: Errors = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Please enter a valid email.'
    if (message.trim().length < 12) next.message = 'Please add a little more context.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      setStatus('idle')
      return
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name.trim()}`)
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setStatus('success')
  }

  return (
    <section id="contact" className="section-block contact-section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Contact"
          title="Have a role, a product problem or a good technical question?"
          description="The form opens your email client directly. No pretend backend, no silent form submission."
          id="contact-title"
        />

        <div ref={ref} className={`contact-layout reveal ${visible ? 'is-visible' : ''}`}>
          <div className="contact-intro">
            <p className="contact-big">Let's talk about what needs building.</p>
            <div className="contact-details">
              <a href={`mailto:${EMAIL}`}>{EMAIL} ↗</a>
              <a href="https://github.com/mohdriyaan" target="_blank" rel="noreferrer">github.com/mohdriyaan ↗</a>
              <a href="https://linkedin.com/in/mohammed-riyaan" target="_blank" rel="noreferrer">linkedin.com/in/mohammed-riyaan ↗</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit} noValidate>
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}

            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}

            <label htmlFor="message">Message</label>
            <textarea id="message" rows={6} value={message} onChange={(event) => setMessage(event.target.value)} aria-invalid={Boolean(errors.message)} />
            {errors.message ? <span className="field-error">{errors.message}</span> : null}

            <Button type="submit">Open email draft ↗</Button>
            {status === 'success' ? <p className="form-status">Your email draft should now be open. Hit send there to reach me.</p> : null}
          </form>
        </div>
      </div>
    </section>
  )
}
