import FeaturedEducatorSection from '@/components/featured-educator-section'
import { snakeCase } from 'lodash'

const FEATURED_EDUCATOR = 'John Smith'
const featuredEducatorId = snakeCase(FEATURED_EDUCATOR)

export default function Home() {
  return (
    <div className="py-16">
      <FeaturedEducatorSection
        educatorName={FEATURED_EDUCATOR}
        educatorId={featuredEducatorId}
      />
    </div>
  )
}
