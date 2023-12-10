<script lang="ts">
     import Image from "./Image.svelte";

     export let posts: any;
</script>

{ #each posts as post }
<div class="post-cont">
     <div class="post-card">
          <a href="/hentai/{post.code}">
               <div class="post-img">
                    <div class="img-cont" style="aspect-ratio: {post.cover_ratio }">
                         <Image 
                         sizes="sm:150 md:300 lg:600"
                         quality="60"
                         loading="lazy"
                         fit="crop"
                         src="covers/{post.code}"
                         alt="{post.title}"
                         title="{post.title}"
                         width={null}
                         height={null}
                         />
                    </div>
                    <div class="info">
                         { #if post.rate}
                         <div class="rate">  
                              <strong>{ post.rate }</strong>
                              <i>S</i>
                         </div>
                         { /if }
                         
                         { #if post.pages}
                         <div class="pages">  
                              <strong>{ post.pages }P</strong>
                         </div>
                         {/if}
                    </div>
               </div>
               <div class="post-title">
                    <div class="title">
                         <img src="/{post.language}.png" alt="{post.language}" width="18" height="18">
                         <div>
                              <h3>{ post.title }</h3>
                         </div>
                    </div>
               </div>
          </a>
     </div>
</div>
{/each}

<style lang="scss" scoped>
     .post-cont {
          height: max-content;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
     }
     .post-card {
          position: relative;
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          font-family: inherit;
          overflow: hidden;
          div {
               width: 100%;
          }
          &:hover {
               .post-title {
                    .title {
                         position: absolute;
                         left: 0;
                         bottom: 0;
                         white-space: pre-wrap;
                         height: auto;
                         min-height: 2.6rem;
                         border-radius: 0 0 3px 3px;
                         z-index: 99;
                    }
               }
          }
          .post-img {
               position: relative;
               background-color: #323232;
               min-height: 7rem;
               overflow: hidden;
               border-radius: 3px 3px 0 0;
               .img-cont {
                    width: 100%;
                    margin: 0 auto;
                    img {
                         display: block;
                         width: 100%;
                         height: 100%;
                         max-width: 100%;
                         max-height: 100%;
                    }
               }
               .info {
                    position: absolute;
                    bottom: 0;
                    left: -1%;
                    width: auto;
                    padding: .3rem;
                    color: #ffffff;
                    display: flex;
                    >div {
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         font-size: .65rem;
                         font-family: inherit;
                         width: 2rem;
                         height: 2rem;
                         border-radius: 50%;
                         margin: 0 .1rem;
                         background-color: rgba(0, 0, 0, 0.5);
                    }
               }
          }

          .post-title {
               height: 2.6rem;
               background-color: #373737;
               overflow: hidden;
               text-overflow: ellipsis;
               color: #eaeaea;
               display: flex;
               flex-direction: column;
               align-items: center;
               text-align: left;
               border-radius: 0 0 3px 3px;
               .title {
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    padding: .2rem .5rem;
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    background-color: inherit;
                    >div {
                         overflow: hidden;
                    }
               }
               h3 {
                    font-size: .85rem;
               }
               img {
                    margin-right: .5rem;
               }
          }

          a {
               text-decoration: none;
          }
    }
</style>
