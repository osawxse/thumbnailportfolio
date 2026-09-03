'use client'

import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  company: z.string().min(2, 'Please enter your company or channel name.'),
  role: z.string().min(1, 'Please select your role.'),
  youtubeChannel: z
    .string()
    .min(1, 'Please enter your YouTube channel URL.')
    .refine(
      (value) => {
        try {
          const normalized = value.match(/^https?:\/\//i)
            ? value
            : `https://${value}`

          const url = new URL(normalized)

          return (
            url.hostname === 'youtube.com' ||
            url.hostname === 'www.youtube.com' ||
            url.hostname === 'm.youtube.com'
          )
        } catch {
          return false
        }
      },
      {
        message: 'Please enter a valid YouTube channel URL.',
      },
    ),
  service: z.string().min(1, 'Please select a service.'),
  projectDescription: z
    .string()
    .min(20, 'Please provide at least 20 characters describing the project.'),
  monthlyVideoVolume: z.string().optional(),
  budget: z.string().optional(),
  desiredStartDate: z.string().optional(),
  additionalInfo: z.string().optional(),
  honeypot: z.string().max(0),
})

type Form = Record<string, string>
type Errors = Record<string, string>

const fields = [
  ['fullName', 'Full name', 'text'],
  ['email', 'Email', 'email'],
  ['company', 'Company / channel name', 'text'],
  ['youtubeChannel', 'YouTube channel URL', 'text'],
] as const

export function ApplicationForm() {
  const [form, setForm] = useState<Form>({
    honeypot: '',
  })

  const [state, setState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const [errors, setErrors] = useState<Errors>({})

  const update = (key: string, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))

    setErrors((current) => {
      if (!current[key]) return current

      const next = { ...current }
      delete next[key]
      return next
    })

    if (state === 'error') {
      setState('idle')
    }
  }

  const inputClass = (field: string) =>
    `rounded-xl border ${
      errors[field] ? 'border-red-600' : 'border-[var(--line)]'
    } bg-white/50 px-4 py-3 outline-none focus:ring-2 ${
      errors[field] ? 'focus:ring-red-600' : 'focus:ring-black'
    }`

  async function submit(e: React.FormEvent) {
    e.preventDefault()

    setErrors({})
    setState('idle')

    const parsed = schema.safeParse(form)

    if (!parsed.success) {
      const fieldErrors: Errors = {}

      for (const issue of parsed.error.issues) {
        const field = issue.path[0]

        if (typeof field === 'string' && !fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }

      setErrors(fieldErrors)

      const firstError = Object.keys(fieldErrors)[0]

      if (firstError) {
        document.getElementById(firstError)?.focus()
      }

      return
    }

    let youtubeChannel = form.youtubeChannel.trim()

    if (!/^https?:\/\//i.test(youtubeChannel)) {
      youtubeChannel = `https://${youtubeChannel}`
    }

    setState('loading')

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          youtubeChannel,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="border border-black rounded-[20px] p-8 bg-white/40">
        <p className="mono">Application received</p>

        <h3 className="display text-4xl mt-4">
          Thanks. I’ll review the brief and get back to you.
        </h3>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="grid md:grid-cols-2 gap-5"
      noValidate
    >
      <input
        id="website"
        tabIndex={-1}
        aria-hidden
        name="website"
        value={form.honeypot}
        onChange={(e) => update('honeypot', e.target.value)}
        className="hidden"
        autoComplete="off"
      />

      {fields.map(([key, label, type]) => (
        <label key={key} className="grid gap-2 text-sm font-medium">
          <span>
            {label} <span aria-hidden="true">*</span>
          </span>

          <input
            id={key}
            required
            aria-invalid={Boolean(errors[key])}
            aria-describedby={errors[key] ? `${key}-error` : undefined}
            value={form[key] || ''}
            onChange={(e) => update(key, e.target.value)}
            type={type}
            placeholder={
              key === 'youtubeChannel'
                ? 'youtube.com/@yourchannel'
                : undefined
            }
            className={inputClass(key)}
          />

          {errors[key] && (
            <span
              id={`${key}-error`}
              className="text-sm text-red-700"
            >
              {errors[key]}
            </span>
          )}
        </label>
      ))}

      <label className="grid gap-2 text-sm font-medium">
        <span>
          Role <span aria-hidden="true">*</span>
        </span>

        <select
          id="role"
          required
          aria-invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? 'role-error' : undefined}
          value={form.role || ''}
          onChange={(e) => update('role', e.target.value)}
          className={inputClass('role')}
        >
          <option value="">Select</option>

          {[
            'Creator',
            'Channel Owner',
            'Producer',
            'Creative Director',
            'Brand',
            'Agency',
            'Other',
          ].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        {errors.role && (
          <span id="role-error" className="text-sm text-red-700">
            {errors.role}
          </span>
        )}
      </label>

      <label className="grid gap-2 text-sm font-medium">
        <span>
          Service needed <span aria-hidden="true">*</span>
        </span>

        <select
          id="service"
          required
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? 'service-error' : undefined}
          value={form.service || ''}
          onChange={(e) => update('service', e.target.value)}
          className={inputClass('service')}
        >
          <option value="">Select</option>

          {[
            'Consulting',
            'Ideation',
            'Thumbnail Design',
            'Full Packaging',
            'Other',
          ].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        {errors.service && (
          <span id="service-error" className="text-sm text-red-700">
            {errors.service}
          </span>
        )}
      </label>

      <label className="md:col-span-2 grid gap-2 text-sm font-medium">
        <span>
          Brief project description <span aria-hidden="true">*</span>
        </span>

        <textarea
          id="projectDescription"
          required
          minLength={20}
          aria-invalid={Boolean(errors.projectDescription)}
          aria-describedby={
            errors.projectDescription
              ? 'projectDescription-error'
              : undefined
          }
          value={form.projectDescription || ''}
          onChange={(e) => update('projectDescription', e.target.value)}
          rows={5}
          placeholder="Tell me what you're trying to achieve with your thumbnails or channel packaging."
          className={inputClass('projectDescription')}
        />

        {errors.projectDescription && (
          <span
            id="projectDescription-error"
            className="text-sm text-red-700"
          >
            {errors.projectDescription}
          </span>
        )}
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Monthly video volume

        <input
          id="monthlyVideoVolume"
          value={form.monthlyVideoVolume || ''}
          onChange={(e) => update('monthlyVideoVolume', e.target.value)}
          placeholder="e.g. 4–8"
          className={inputClass('monthlyVideoVolume')}
        />
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Approximate budget

        <select
          id="budget"
          value={form.budget || ''}
          onChange={(e) => update('budget', e.target.value)}
          className={inputClass('budget')}
        >
          <option value="">Select</option>

          {[
            'Under $50',
            '$50–$100',
            '$100–$250',
            '$250+',
          ].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Desired start date

        <input
          id="desiredStartDate"
          type="date"
          value={form.desiredStartDate || ''}
          onChange={(e) => update('desiredStartDate', e.target.value)}
          className={inputClass('desiredStartDate')}
        />
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Additional information

        <textarea
          id="additionalInfo"
          rows={3}
          value={form.additionalInfo || ''}
          onChange={(e) => update('additionalInfo', e.target.value)}
          className={inputClass('additionalInfo')}
        />
      </label>

      {state === 'error' && (
        <p
          role="alert"
          className="md:col-span-2 text-sm text-red-700"
        >
          Couldn’t submit the application. Please try again.
        </p>
      )}

      <div className="md:col-span-2 flex items-center justify-between gap-5">
        <p className="text-xs text-[var(--muted)]">
          A short form. No spam. Your details stay private.
        </p>

        <button
          type="submit"
          disabled={state === 'loading'}
          className="rounded-full bg-[var(--ink)] text-white px-7 py-3 font-semibold disabled:opacity-50"
        >
          {state === 'loading' ? 'Sending…' : 'Submit application'}
        </button>
      </div>
    </form>
  )
}