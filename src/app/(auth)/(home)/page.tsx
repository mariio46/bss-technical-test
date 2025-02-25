import { Container } from '@/components/container';
import { Header, HeaderSubTitle, HeaderTitle } from '@/components/header';

import { ProductsTableContent } from '@/features/products/table-content';
import { ProductsTableFooter } from '@/features/products/table-footer';
import { ProductsTableHeader } from '@/features/products/table-header';

export default function HomePage() {
    return (
        <Container>
            <Header className='mt-14'>
                <HeaderTitle>Product</HeaderTitle>
                <HeaderSubTitle className='max-w-xl'>
                    Manage your product list with ease. You can search, filter, add new products, edit existing ones,
                    and delete items as needed to keep your inventory organized and up to date.
                </HeaderSubTitle>
            </Header>

            <section id='table-header' className='mt-8'>
                <ProductsTableHeader />
            </section>

            <section id='table-content' className='my-4'>
                <ProductsTableContent />
            </section>

            <section id='table-footer' className='mb-14'>
                <ProductsTableFooter />
            </section>
        </Container>
    );
}
