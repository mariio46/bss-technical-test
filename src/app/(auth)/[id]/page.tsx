import type { Params } from '@/types/app';

import { Container } from '@/components/container';
import { Header, HeaderSubTitle, HeaderTitle } from '@/components/header';

import { ProductContent } from '@/features/products/detail/product-content';
import { ProductHeader } from '@/features/products/detail/product-header';

export default async function DetailProductPage({ params }: Params<{ id: string }>) {
    const productId = (await params).id;

    return (
        <Container>
            <Header className='mt-14'>
                <HeaderTitle>Detail Product</HeaderTitle>
                <HeaderSubTitle className='max-w-xl'>
                    View complete information about the selected product, including specifications, availability, and
                    other relevant details.
                </HeaderSubTitle>
            </Header>

            <section id='detail-product-header' className='mt-8'>
                <ProductHeader id={productId} />
            </section>

            <section id='detail-product-content' className='mb-14 mt-4'>
                <ProductContent id={productId} />
            </section>
        </Container>
    );
}
