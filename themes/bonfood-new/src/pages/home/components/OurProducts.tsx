// function OurProducts() {
//   return <>
//       <section class="our_products hidden lg:flex">

// <div class="container flex flex-col our_products__wrapper mx-auto w-full lg:w-4/5 3xl:w-2/3 space-y-12">

//     <?php get_headline('Уже пробовали наши продукты?'); ?>

//     <div class="space-y-8 xl:space-y-4">
//         <div class="swiper-container our_products-thumbs">

//             <div class="our_products__thumbnails swiper-wrapper flex flex-wrap items-center gap-2 p-2 h-16 bg-gray-50 rounded-lg">

//                 <?php
//                 $productNames = ["Воложка", "Bon Agro", "Доброфлот", "Азбука Моря", "Южморрыбфлот", "Владкон", "Меленъ", "Экопродукт", "Бояринъ"];
//                 ?>

//                 <?php foreach ($productNames as $productName) : ?>
//                     <div class="swiper-slide flex text-sm font-medium rounded-lg py-2 px-3 w-fit border hover:border-primary cursor-pointer">
//                         <?php echo $productName; ?>
//                     </div>
//                 <?php endforeach; ?>

//             </div>
//         </div>

//         <div class="our_products__swiper our_products-main swiper-container swiper tabs-content md:col-span-2 lg:row-span-2 overflow-hidden h-[25rem] 2xl:h-[30rem]">

//             <div class="swiper-wrapper flex h-full">
//                 <?php for ($i = 0; $i < 8; $i++) : ?>
//                     <div class="swiper-slide flex flex-row gap-2 xl:gap-36 2xl:gap-0 flex-shrink-0 h-full rounded-2xl overflow-hidden bg-[url('/wp-content/themes/init/img/images/swiperOurProducts/bg_our_products.webp')] bg-no-repeat bg-cover">

//                         <div class="text-content w-1/3 2xl:w-1/2 flex flex-col pt-4 2xl:pr-52 2xl:pt-20 space-y-4">

//                             <a class="text-sm text-gray-400 font-semibold text-left hover:text-green-900 cursor-pointer">Попробовать!</a>
//                             <h4 class="2xl:text-2xl font-medium">Воложка</h4>
//                             <div class="2xl:text-base text-gray-400">
//                                 <p class="">«Воложка» – это 100% натуральный продукт, в котором нет химических добавок, красителей и ароматизаторов.</p>
//                                 <p>В ассортимент продукции под торговой маркой «Воложка» входят крупы, хлопья и бобовые культуры, использующиеся в приготовлении пищи. В варочных пакетиках расфасована крупа высших сортов. </p>
//                             </div>

//                             <a class="shop-link w-fit flex gap-2 items-center font-medium text-base hover:text-green-900 text-primary hover:gap-4 transition-all" href="">
//                                 <span>Перейти в каталог</span>
//                                 <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-6 pt-1">
//                                     <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//                                 </svg>
//                             </a>

//                         </div>

//                         <div class="products-content 2xl:h-full w-[24rem] 2xl:w-1/2">
//                             <div class="flex flex-row gap-2 xl:gap-4 2xl:gap-8 2xl:px-8 2xl:w-3/4 h-full items-center">

//                                 <div class="shrink-0 relative bg-white w-3/5 border-gray-200 border rounded-xl flex flex-col items-center gap-4 p-4 justify-between group/item cursor-pointer">
//                                     <img class="h-64 sm:h-44" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="">
//                                     <a href="<?php the_permalink(); ?>" class="feature__item-title text-center leading-snug w-4/5"><?php the_title(); ?></a>
//                                     <div class="actions flex justify-between items-center gap-8 w-full">
//                                         <h3 class="text-xl font-semibold"><?php echo get_post_meta($post->ID, 'price', true); ?></h3>

//                                         <div class="shop-link feature-link-dop">
//                                             <a class="flex items-center justify-center p-4 bg-primary rounded-md" href="">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 stroke-white stroke-2">
//                                                     <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
//                                                 </svg>
//                                             </a>
//                                         </div>
//                                     </div>

//                                     <svg class="h-6 group-hover/item:opacity-100 transition-opacity absolute top-5 right-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-red-800">
//                                         <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                                     </svg>
//                                 </div>
//                                 <div class="shrink-0 relative bg-white w-3/5 border-gray-200 border rounded-xl flex flex-col items-center gap-4 p-4 justify-between group/item cursor-pointer">
//                                     <img class="h-64 sm:h-44" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="">
//                                     <a href="<?php the_permalink(); ?>" class="feature__item-title text-center leading-snug w-4/5"><?php the_title(); ?></a>
//                                     <div class="actions flex justify-between items-center gap-8 w-full">
//                                         <h3 class="text-xl font-semibold"><?php echo get_post_meta($post->ID, 'price', true); ?></h3>
//                                         <div class="shop-link feature-link-dop">
//                                             <a class="flex items-center justify-center p-4 bg-primary rounded-md" href="">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 stroke-white stroke-2">
//                                                     <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
//                                                 </svg>
//                                             </a>
//                                         </div>
//                                     </div>

//                                     <svg class="h-6 group-hover/item:opacity-100 transition-opacity absolute top-5 right-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-red-800">
//                                         <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                                     </svg>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                 <?php endfor; ?>

//             </div>

//         </div>
//     </div>

// </div>

// </section>
//   </>;
// }

// export default OurProducts;
