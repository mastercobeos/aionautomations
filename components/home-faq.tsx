"use client"

import { useTranslations } from 'next-intl'
import { FaqAccordion } from '@/components/faq-accordion'

export function HomeFaq() {
  const t = useTranslations('HomeFaq')

  const items = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
    { question: t('faq6Q'), answer: t('faq6A') },
    { question: t('faq7Q'), answer: t('faq7A') },
    { question: t('faq8Q'), answer: t('faq8A') },
    { question: t('faq9Q'), answer: t('faq9A') },
    { question: t('faq10Q'), answer: t('faq10A') },
  ]

  return (
    <div id="faq">
      <FaqAccordion items={items} title={t('title')} />
    </div>
  )
}
