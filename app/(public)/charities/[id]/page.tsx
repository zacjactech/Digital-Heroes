// Individual charity page — route: /charities/[id]
interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CharityPage({ params }: PageProps) {
  const { id } = await params
  return <main><p className="p-8">Charity {id} — implement from stitch</p></main>
}
