import Link from 'next/link'

const Footer = () => {
    return (
        <>
            <nav className="bg-neutral-800 border-gray-200 font-roboto">
                <div className="flex flex-col gap-2 flex-wrap items-center justify-center mx-auto p-4 font-roboto">
                    <div className="flex flex-row gap-4">
                        <Link href="/" className="flex flex-row items-center">
                            <img src="/icon.png" className="h-7 mr-3" alt={`Logo`} />
                        </Link>
                    </div>
                    <span className="text-gray-50 font-roboto">UpToDate</span>
                    <div className="flex flex-row">
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Footer;