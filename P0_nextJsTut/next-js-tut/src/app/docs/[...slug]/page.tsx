import styles from './docs.module.css'

type Params = {
    params: {
        slug: string[]
    }
}

export default function DocsPage(
    { params }: Params
) {
    const slug = params.slug || []
    return (
        <section className={styles.container}>
            <h1 className={styles.heading}>Document Page</h1>
            <p className={styles.para}>You are visiting the docs page with path segments</p>
            <ul className={styles.list}>
                {slug.length > 0 ? 
                    (slug.map( (segment, index) => ( 
                        <li key={index}>{segment}</li> 
                    ))) : 
                    (<li>Root docs page (no slug)</li>)}
            </ul>
        </section>
    )
}