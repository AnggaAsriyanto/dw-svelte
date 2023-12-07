<script lang="ts">
	import Image from "../../Image.svelte";
     import type { LayoutServerData } from "../../hentai/[code]/$types";

     export let data: LayoutServerData

     const post = data.content
     const images = data.images

     console.log(data)
</script>

<div class="img-container">
     <Image 
     src={data.content.code}
     sizes="sm:250 md:300 lg:600" 
     width={null} 
     height={null} 
     alt={data.content.title} 
     quality="80"
     fit="fill"
     title={data.content.title}
     loading={null}
     />
</div>

<!-- <p>{ data.content.code }</p>
<ul>
     {#each data.images as image, index}
          <li>
               <a href="/hentai/{data.content.code}/{index + 1}">
                    { image.key }
               </a>
          </li>
     {/each}
</ul> -->

<svelte:head>
     <title>{ data.content.title }</title>
</svelte:head>

<div class="post-page">
     <section class="post-info">

          <div class="post-details">
               <div class="cover-cont">
                    <div class="img-cont">
                         <a href="hentai/{post.content.code}/1" style="aspect-ratio: { data.content.cover_ratio }" rel="nofollow">
                              <Image
                              sizes="sm:250 md:300 lg:600"
                              quality="80"
                              fit="contain"
                              width={null}
                              height={null}
                              src="covers/{data.content.code}"
                              alt={data.content.title}
                              title={data.content.title}
                              loading={null}
                              />
                         </a>
                    </div>
               </div>
               <div class="details-cont">
                    <div>
                         <h1>{ data.content.title }</h1>
                         {#if data.content.original_content}
                              <h2>{  data.content.original_title }</h2>      
                         {/if}
                    </div>

                    <div>
                         <div class="action">
                              <button type="button" aria-label="copy code" class="action-cont">
                                   <span>
                                        {  data.content.code  }
                                   </span>
                                   <span>
                                        <!-- <Icon v-show="!copied" name="ic:baseline-content-copy" /> -->
                                        <!-- <Icon v-show="copied" name="ic:round-check" /> -->
                                   </span>
                              </button>
                         </div>
                         <div class="action">
                              <button type="button" aria-label="favorite" class="action-cont">
                                   <span>
                                        { data.content.total_favorites }
                                   </span>
                                   <span class="favorite">
                                        <!-- <Icon v-show="!favorite" name="material-symbols:favorite-outline-rounded"/> -->
                                        <!-- <Icon v-show="favorite" name="material-symbols:heart-plus"/> -->
                                   </span>
                              </button>

                         </div>
                    </div>

                    <div class="main-info">
                         <div>
                              <strong>
                                   { data.content.pages }
                              </strong>
                              <small>pages</small>
                         </div>
                         <div>
                              <strong>{ data.content.total_reads === null || data.content.total_reads < 100 ? 'N/A' : data.content.total_reads }</strong>
                              <small>reads</small>
                         </div>
                         <div>
                              <strong>{ data.content.rate === null ? 'N/A' : data.content.rate + '/5' }</strong>
                              <small>rate</small>
                         </div>
                    </div>

                    <!-- <div class="tags-cont">
                         {#if data.content.artist}
                              <strong>Artist by </strong>
                              {#each data.content.artists as artist}
                                   <a href="/">{artist}</a>
                              {/each}
                         {/if}

                         {#if data.content.groups}
                              <strong>Artist by </strong>
                              {#each data.content.groups as group}
                                   <a href="/">{group}</a>
                              {/each}
                         {/if}

                         {#if data.content.is_parody}
                              <strong>Artist by </strong>
                              {#each data.content.title_parody as parody}
                                   <a href="/">{parody}</a>
                              {/each}
                         {/if}

                         {#if data.content.chara_parody}
                              <strong>Artist by </strong>
                              {#each data.content.chara_parody as chara}
                                   <a href="/">{chara}</a>
                              {/each}
                         {/if}

                         {#if data.content.tags}
                              <strong>Artist by </strong>
                              {#each data.content.tags as tag}
                                   <a href="/">{tag}</a>
                              {/each}
                         {/if}

                         {#if data.content.category}
                              <strong>Artist by </strong>
                              <a href="/">{data.content.category}</a>
                         {/if}

                         {#if data.content.language}
                              <strong>Artist by </strong>
                              <a href="/">{data.content.language}</a>
                         {/if}
                    </div> -->

                    <div class="opt">
                         <div class="rate">
                              <button aria-label="Give Rate">
                                   <span>
                                        Give Rate
                                   </span>
                                   <!-- <span>
                                        Rated {{ isRated }}
                                   </span> -->
                              </button>
                         </div>
                         <div class="language">
                              <div class="active">
                                   <img src="/{post.language}.png" alt="{post.language}" width="24" height="24"/>
                              </div>

                              <!-- <div v-if="alterLang.length" v-for="(lang, idx) in alterLang" :key="idx">
                                   <NuxtLink :to="`/hentai/${lang.code}`">
                                        <img :src="`/${lang.language}.png`" :alt="lang.language" width="24" height="24"/>
                                   </NuxtLink>
                              </div> -->
                         </div>

                         <!-- <div v-if="openRate" id="rating">
                              <strong>Rating</strong>
                              <div>
                                   <span v-for="s in 5" :key="s" @click="setRating(s)">
                                        <Icon :name="rating >= s ? 'material-symbols:star' : 'material-symbols:star-outline'" />
                                   </span>
                              </div>

                              <div>
                                   <div>
                                        <form @submit.prevent="handleRating">
                                             <button type="submit" class="submit" :disabled="!rating">Give {{ rating === 0 ? '' : rating }} Star!</button>
                                        </form>
                                   </div>
                                   <div>
                                        <button class="cancel" @click="openRate = null">Cancel</button>
                                   </div>
                              </div>
                         </div> -->
                    </div>

               </div>
          </div>
     </section>

     {#if post.series}
          <section class="post-series">
               <h3>{ post.title_series } Series 
                    <span>
                         <!-- <Icon v-show="showSeries" name="mdi:chevron-down" />
                         <Icon v-show="!showSeries" name="mdi:chevron-right" /> -->
                    </span>
               </h3>
               {#if false}
                    <ul>
                         {#if false}
                              <div class="series-loading">
                                   <!-- <Icon name="svg-spinners:90-ring-with-bg" /> -->
                              </div>
                         {/if}
                         <!-- <li v-for="(series, idx) in postSeries">
                              <a href="`/hentai/${series.code}`">
                                   <span>
                                        {{  series.title }}
                                   </span>
                                   <span>
                                        <img :src="`/${series.language}.png`" :alt="series.language" width="20" height="20">
                                   </span>
                              </a>
                         </li> -->
                    </ul>
               {/if}
          </section>
     {/if}

     <section class="post-img">
          <ul class="list-cont">
               <!-- <li v-if="!images" v-for="img in (post.pages >= minPages ? minPages : post.pages)" :key="img">
                    <NuxtLink :to="`${$route.fullPath}/${img}`" rel="nofollow">
                         <div class="img-cont-list-pending"></div>
                    </NuxtLink>
               </li> -->
               {#each images as image, idx}
                    <li>
                         <a href="hentai/{data.content.code}/{idx + 1}" rel="nofollow">
                              <div class="img-cont-list">
                                   <!-- <Image
                                   sizes="sm:150 md:200 lg:400"
                                   loading="lazy"
                                   src={image.key}
                                   alt={image.key}
                                   width={image.customMetadata.width}
                                   height={image.customMetadata.height}
                                   title={image.key}
                                   quality=80
                                   fit="contain"
                                   /> -->
                              </div>
                         </a>
                    </li>
               {/each}
          </ul>

          <!-- <div v-if="post.pages > minPages">
               <button @click="changeDisplay">
                    <span v-if="!showAll">
                         Show All <Icon name="zondicons:view-show"/>
                    </span>
                    <span v-else>
                         Hide <Icon name="zondicons:view-hide"/>
                    </span>
               </button>
          </div> -->
     </section>

     <!-- <section class="post-comment">
          <div class="head">
               <h3>Comments</h3>
          </div>
          <div class="box-cont">
               <div class="box-input">
                    <div v-if="!user" class="direct">
                         <p>
                              <span><nuxt-link to="/login">login</nuxt-link></span> or <span><nuxt-link to="/register">register</nuxt-link></span> first to a comment
                         </p>
                    </div>
                    <div v-else class="user">
                         <div class="avatar">
                              <div class="img-cont">
                                   <nuxt-img 
                                   provider="gumlet"
                                   sizes="sm:100px md:100px lg:100px"
                                   quality="60"
                                   fit="cover"
                                   :src="`/profiles/${user.user_metadata.avatar_url}?${random}`"
                                   :alt="user.id"
                                   />
                              </div>
                         </div>
                         <div class="my-comment">
                              <form @submit.prevent="handleComment">
                                   <input v-model="comment" ref="commentInput" type="text" name="comment" id="comment" placeholder="add comment..." maxlength="150">
                                   <button type="submit" :disabled="!comment">Publish</button>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
          <div v-if="!pending" class="list-cont">
               <div v-if="comments?.length" class="comments">
                    <div v-for="(comment, idx) in comments" :key="idx" class="comment">
                         <div class="avatar">
                              <div class="img-cont">
                                   <nuxt-img
                                   provider="gumlet"
                                   sizes="sm:100px md:150px lg:200px"
                                   quality="60"
                                   fit="cover"
                                   :src="`/profiles/${comment.user_id.avatar_url}?${random}`"
                                   :alt="comment.user_id.username"
                                   />
                              </div>
                         </div>
                         <div class="details">
                              <div>
                                   <div class="username">
                                        <nuxt-link :to="`/user/${comment.user_id.id}`">
                                             <p>{{ comment.user_id.username }}</p>
                                        </nuxt-link>

                                        <div class="time">
                                             <p>{{ getCountdownText(comment.created_at) }}</p>
                                        </div>
                                   </div>
                                   <div class="content">
                                        <p>{{ comment.comment }}</p>
                                   </div>
                              </div>
                              <div class="option">
                                   <div v-if="comment.user_id.id === user?.id">
                                        <button @click="openOption(idx)" aria-label="option comment" type="button">
                                             <Icon name="radix-icons:dots-horizontal" />
                                        </button>

                                        <button @click="deleteComment(comments[idx])" aria-label="delete comment" type="button" class="delete" v-if="option === idx">
                                             Delete
                                        </button>
                                   </div>
                                   <div v-else>
                                        <button @click="reportComment(comments[idx])" aria-label="report">
                                             <Icon name="ph:warning-circle-bold" />
                                        </button>
                                   </div>

                              </div>
                         </div>
                    </div>
               </div>
               <div v-else class="no-comment">
                    <strong>No comment yet</strong>
               </div>
          </div>
          <div class="load-cmt" v-else>
               <p><span><Icon name="svg-spinners:90-ring-with-bg"/></span> Load comments...</p>
          </div>
     </section> -->

     <!-- <div v-if="openReport" id="report">
          <div>
               <strong>Report Comment</strong>
               <div>
                    <form @submit.prevent="handleReport">
                         <textarea v-model="contentReport" name="report" id="reportContent" cols="30" rows="7"></textarea>

                         <div class="btn-cont">
                              <button @click="cancelReport" class="cancle">Cancel</button>
                              <button type="submit" class="submit">Report</button>
                         </div>
                    </form>
               </div>
          </div>

     </div> -->

     <!-- <Alert :display="showAlert" :status="statusAlert" :message="messageAlert" /> -->
</div>

<style lang="scss">
     .img-container {
          width: 300px;
          max-width: 300px;
     }

     #report {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #151515;
          height: auto;
          width: 300px;
          border-radius: 5px;
          padding: 1rem;
          font-family: inherit;
          >div {
               display: flex;
               width: max-content;
               height: 100%;
               justify-content: center;
               align-items: center;
               flex-direction: column;
          }
          form {
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               textarea {
                    border: none;
                    color: #eaeaea;
                    padding: .5rem;
                    background-color: #3b3b3b;
                    border-radius: 3px;
                    margin: .5rem 0;
               }
          }

          .comment-report {
               width: 100%;
               height: 70px;
               border: 2px solid #3b3b3b;
               border-radius: 3px;
          }

          .btn-cont {
               display: flex;
               width: 100%;
          }

          strong {
               color: #eaeaea;
               margin-bottom: .5rem;
          }

          button {
               font-family: inherit;
               padding: .3rem .6rem;
               border: none;
               border-radius: 2px;
               margin: .1rem;
               flex: auto;
               &.submit {
                    background-color: rgb(242, 0, 0);
                    color: #eaeaea;
               }
          }
     }

     #rating {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #eaeaea;
          height: auto;
          width: auto;
          min-width: 200px;
          border-radius: 7px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: .5rem;
          z-index: 999;     
          >div {
               flex: 1;
               width: 100%;
               &:nth-of-type(1) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
               }
          }
          button {
               width: 100%;
               padding: .3rem 0;
               margin: .1rem 0;
               border-radius: 5px;
               background-color: transparent;
               border: #28282B 1.5px solid;
               color: #28282B;
               &.submit {
                    background-color: #AA77FF;
                    border: none;
                    color: #fff;
               }
          }
          strong {
               color: #000000;
          }

          span {
               color: #000000;
               font-size: 2.5rem;
               cursor: pointer;
          }
     }
     .post-page {
          section {
               padding: 1rem;
               margin: 0 0 1.3rem;
               background-color: var(--primary);
               border-radius: 3px;
          }
          .post-details {
               display: flex;
               flex-direction: column;
               justify-content: center;
               height: max-content;
               width: 100%;
               color: #efefef;
               font-weight: bold;
               @media (min-width: 550px) {
                    flex-direction: row;
               }
               >div {
                    flex: 1;
               }
               .cover-cont {
                    display: flex;
                    justify-content: center;
                    padding: 1rem .5rem;
               }
          }
          .img-cont {
               width: 100%;
               height: auto;
               overflow: hidden;
               @media (min-width: 550px) {
                    display: flex;
                    justify-content: center;
               }
               a {  
                    margin-top: .3rem;
                    display: block;
                    overflow: hidden;
                    height: fit-content;
                    border-radius: 3px;
                    background-color: #434343;
               }
               img {
                    width: auto;
                    height: 100%;
                    background-color: inherit;
                    object-fit: contain;
                    display: block;
                    @media (min-width: 550px) {
                         max-height: 420px;
                    }
               }
          }
          .details-cont {
               padding: 1rem 1rem 0;
               >div {
                    margin: 0 0 1.1rem;
               }
               small {
                    color: #999999;
               }
               h1 {
                    line-height: 2.4rem;
               }
               h2 {
                    margin-top: .7rem;
                    font-size: 1.15rem;
                    color: #999999;
               }
               .action {
                    display: inline-block;
                    font-weight: 400;
                    margin: .5rem .1rem 0;
                    position: relative;
                    .action-cont {
                         display: flex;
                         align-items: center;
                         width: max-content;
                         cursor: pointer;
                         border: transparent;
                         border-radius: 3px;
                         overflow: hidden;
                         color: #e9e9e9;
                         font-size: .9rem;
                         background-color: #373737;
                         >span {
                              padding: .3rem .6rem;
                              &:nth-last-of-type(1) {
                                   background-color: #181818;
                              }
                              &.favorite {
                                   background-color: var(--secondary);
                              }
                              
                         }
                    }
               }
               .main-info {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2rem;
                    @media (min-width: 850px) {
                         max-width: 60%;
                    }
                    >div {
                         display: flex;
                         flex-direction: column;
                         align-items: center;
                    }
                    strong {
                         display: flex;
                         align-items: center;
                         font-size: 1.1rem;
                         svg {
                              margin-right: .2rem;
                         }
                    }
               }
               .tags-cont {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    margin-bottom: 0;
                    strong {
                         font-size: .85rem;
                         color: #999999;
                    }
                    .tag {
                         display: inline-block;
                         font-size: .85rem;
                         color: #dadada;
                    }

                    a {
                         display: block;
                         margin: .11rem;
                         padding: .15rem .50rem;
                         background-color: #404040;
                         border-radius: 4px;
                         color: inherit;
                         text-decoration: none;
                         &:active {
                              opacity: .5;
                         }
                    }
               }

               .opt {
                    display: flex;
                    flex-wrap: wrap-reverse;
                    width: 100%;
                    margin-bottom: 0;
                    margin-top: .5rem;
                    >div {
                         margin: 1rem .2rem;
                         display: flex;
                         height: 2.5rem;
                    }
                    .rate {
                         margin-top: 0;
                         button {
                              font-family: inherit;
                              font-size: 1rem;
                              background-color: #eaeaea;
                              padding: 0 1rem;
                              border: none;
                              border-radius: 8px;
                              display: flex;
                              align-items: center;
                              cursor: pointer;
                              span {
                                   display: flex;
                                   align-items: center;
                              }
                              &:disabled {
                                   opacity: 1;
                              }
                         }
                    }
                    .language {
                         padding: 0 .5rem;
                         border-radius: 5px;
                         background-color: #1c1c1c;
                         >div {
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              margin: 0 .8rem;
                              opacity: .25;
                              cursor: pointer;
                              &.active {
                                   opacity: 1;
                              }
                              a {
                                   display: flex;
                                   align-items: center;
                              }
                         }
                         img {
                              padding: .1rem;
                              background-color: #404040;
                              border-radius: 3px;
                         }
                    }
               }
          }

          .post-series {
               color: #eaeaea;
               padding: 1rem 2rem;
               display: flex;
               justify-content: center;
               align-items: center;
               flex-direction: column;
               text-align: center;
               h3 {
                    font-size: 1.1rem;
                    cursor: pointer;
               }
               ul {
                    width: max-content;
                    min-width: 50%;
                    max-width: 100%;
                    height: auto;
                    margin-top: 1rem;
                    text-align: left;
                    background-color: #1c1c1c;
                    border-radius: 5px;
                    padding: .5rem;
                    li {
                         width: 100%;
                         overflow: hidden;
                         margin: .6rem 0;
                    }
               }
               a {
                    text-decoration: none;
                    font-size: .92rem;
                    color: inherit;
                    display: flex;
                    justify-content: space-between;
                    white-space: nowrap;
                    span {
                         overflow: hidden;
                         min-width: 25px;
                         margin: 0 .5rem;
                    }
                    &.router-link-active {
                         color: var(--secondary);
                    }
               }
               .series-loading {
                    text-align: center;
               }
          }
          .post-img {
               position: relative;
               .list-cont {
                    width: 100%;
                    height: max-content;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                    gap: .2rem;
                    @media (min-width: 550px) {
                         padding: .5rem 1rem;
                         grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));   
                    };
                    .img-cont-list {
                         overflow: hidden;
                         background-color: #323232;
                    }
                    .img-cont-list-pending {
                         height: 15rem;
                         background-color: #323232;
                         @media (min-width: 550px) {
                              height: 20rem;
                         }
                    }
                    img {
                         display: block;
                         border-radius: 3px;
                         height: 100%;
                         width: 100%;
                    }
               }
               >div {
                    position: absolute;
                    bottom: 0;
                    left: -50%;
                    transform: translateX(50%);
                    background-color: inherit;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    width: 100%;                   
                    button {
                         width: 100%;
                         height: 3rem;
                         background-color: inherit;
                         border: none;
                         color: #e9e9e9;
                         opacity: .7;
                         font-size: .85rem;
                         font-weight: bold;
                         span {
                              border: 2px solid #878787;
                              padding: .3rem .5rem;
                              border-radius: 4px;
                         }
                    }
               }
          }

          .post-comment {
               display: flex;
               align-items: center;
               flex-direction: column;
               padding: 1.5rem 1.5rem 0;
               margin-bottom: 0;
               .box-cont {
                    max-width: 600px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #fff;
               }
               .head {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    margin-bottom: 2rem;
                    color: #d0d0d0;
               }
               .box-input {
                    width: 100%;
                    max-width: 100%;
                    height: 3rem;
                    background-color: #171717;
                    border-radius: 3px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .user {
                         width: 100%;
                         display: flex;
                    }
                    .direct {
                         p {  
                              font-size: .85rem;
                              color: #b8b8b8;
                         }
                         a {
                              color: inherit;
                         }
                    }

                    .avatar {
                         width: 3rem;
                         .img-cont {
                              height: 2rem;
                              width: 2rem;
                              border-radius: 50%;
                              overflow: hidden;
                              margin: 0 1rem;
                              border: 2px solid #AA77FF;
                              img {
                                   border: none;
                                   height: 100%;
                                   width: 100%;
                                   object-fit: cover;
                                   padding: 0;
                              }
                         }
                    }
                    .my-comment {
                         flex: auto;
                         form {
                              display: flex;
                              justify-content: space-between;
                              margin-left: 1rem;
                              align-items: center;
                         }
                         input {
                              height: 2rem;
                              flex: 9;
                              font-family: inherit;
                              font-weight: 400;
                              background-color: inherit;
                              border: none;
                              color: #d0d0d0;
                         }
                         button {
                              display: none;
                              flex: 1;
                              height: 2.2rem;
                              margin: 0 .5rem;
                              font-family: inherit;
                              border-radius: 5px;
                              border: none;
                              background-color: #000000;
                              color: #e9e9e9;
                              padding: 0 1rem;
                              cursor: pointer;
                              @media (min-width: 850px) {
                                   display: block;
                              }

                         }
                    }
               }
               .list-cont {
                    display: flex;
                    width: 100%;
                    max-width: 600px;
                    height: auto;
                    .comments {
                         height: auto;
                         padding: 2rem 0;
                         width: 100%;
                         .comment {
                              display: flex;
                              color: #fff;
                              padding: .7rem 0;
                              width: 100%;
                              .avatar {
                                   width: 4rem;
                                   height: auto;
                                   display: flex;
                                   justify-content: center;
                                   .img-cont {
                                        width: 2.7rem;
                                        height: 2.7rem;
                                        border-radius: 50%;
                                        background-color: #323232;
                                        img {
                                             height: 100%;
                                             width: 100%;
                                             object-fit: cover;
                                             border: none;
                                             padding: 0;
                                        }
                                   }
                              }
                              .details {
                                   font-size: .9rem;
                                   flex: 1;
                                   display: flex;
                                   justify-content: space-between;
                                   .username {
                                        display: flex;
                                        .time {
                                             margin-left: .7rem;
                                             p {
                                                  font-weight: 400;
                                                  font-size: .75rem;
                                                  opacity: 1;
                                                  color: #a2a2a2;
                                             }
                                        }
                                        a {
                                             color: #dadada;
                                             text-decoration: none;
                                             &:hover {
                                                  text-decoration: underline;
                                             }
                                        }
                                        p {
                                             font-weight: bold;
                                             color: #dadada;
                                        }
                                   }
                                   .content {
                                        p {
                                             margin: .25rem 0;
                                             color: #b8b8b8;
                                             font-size: .9rem;
                                        }
                                   }
                                   .option {
                                        color: #fff;
                                        opacity: .5;
                                        >div {
                                             position: relative;
                                        }
                                        button {
                                             color: inherit;
                                             border: none;
                                             border-color: inherit;
                                             background-color: transparent;
                                             font-family: inherit;
                                             font-size: 1rem;
                                             cursor: pointer;
                                             display: flex;
                                             &.delete {
                                                  position: absolute;
                                                  top: 0;
                                                  right: 200%;
                                                  background-color: #000000;
                                                  padding: .2rem .5rem;
                                                  border-radius: 3px;
                                                  color: #ff0000;
                                                  font-weight: bold;
                                                  font-size: .85rem;
                                             }
                                             &:active {
                                                  transform: scale(.90);
                                             }
                                        }
                                   }
                              }
                         }
                    }
                    .no-comment {
                         width: 100%;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         padding: 1rem 0;
                         color: #b8b8b8;
                         font-size: .85rem;
                    }
               }
               .load-cmt {
                    padding: 1rem 0;
                    color: #e9e9e9;
                    opacity: .4;
               }
          }
     }
</style>
