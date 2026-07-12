import { Hero, type HeroBlockProps } from '@/blocks/hero/Component'
import { Partners, type PartnersBlockProps } from '@/blocks/partners/Component'
import { Services, type ServicesBlockProps } from '@/blocks/services/Component'
import { Advantages, type AdvantagesBlockProps } from '@/blocks/advantages/Component'
import { Pricing, type PricingBlockProps } from '@/blocks/pricing/Component'
import { Faq, type FaqBlockProps } from '@/blocks/faq/Component'
import { Consultation, type ConsultationBlockProps } from '@/blocks/consultation/Component'
import { SimpleContent, type SimpleContentBlockProps } from '@/blocks/simple-content/Component'
import { Documents, type DocumentsBlockProps } from '@/blocks/documents/Component'
import { Architecture, type ArchitectureBlockProps } from '@/blocks/architecture/Component'
import { VpsPricingCards, type VpsPricingCardsBlockProps } from '@/blocks/vps-pricing-cards/Component'

export type PageBlock =
  | HeroBlockProps
  | PartnersBlockProps
  | ServicesBlockProps
  | AdvantagesBlockProps
  | PricingBlockProps
  | FaqBlockProps
  | ConsultationBlockProps
  | SimpleContentBlockProps
  | DocumentsBlockProps
  | ArchitectureBlockProps
  | VpsPricingCardsBlockProps

export function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <Hero key={index} {...block} />
          case 'partners':
            return <Partners key={index} {...block} />
          case 'services':
            return <Services key={index} {...block} />
          case 'advantages':
            return <Advantages key={index} {...block} />
          case 'pricing':
            return <Pricing key={index} {...block} />
          case 'faq':
            return <Faq key={index} {...block} />
          case 'consultation':
            return <Consultation key={index} {...block} />
          case 'simple-content':
            return <SimpleContent key={index} {...block} />
          case 'documents':
            return <Documents key={index} {...block} />
          case 'architecture':
            return <Architecture key={index} {...block} />
          case 'vps-pricing-cards':
            return <VpsPricingCards key={index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
