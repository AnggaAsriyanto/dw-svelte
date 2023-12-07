<script lang="ts">
  export let src: any;
  export let sizes: any;
  export let quality: any;
  export let fit: any;
  export let alt: any;
  export let width: any;
  export let height: any;
  export let loading: any;
  export let title: any;
  export let styleClass: any = "img"

  let srcPath = `https://overdoujin.gumlet.io/${src}`

  function generateSrcset(srcPath: any, sizes: string | String, quality: Number, fit: String) {
    const sizeArray = sizes.split(" ");
    const srcsetArray = sizeArray.map(size => {
      const width = size.split(":")[1];
      return `${srcPath}?w=${width}&format=webp&q=${quality}&fit=${fit} ${width}w`;
    });
    return srcsetArray.join(", ");
  }
</script>

<img class="{styleClass}" srcset={generateSrcset(srcPath, sizes, quality, fit)} src={srcPath} alt={alt} width={width} height={height} loading={loading} title={title}/>

<style lang="scss">
  .img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .img-cover {
    width: auto;
    height: 100%;
    background-color: inherit;
    object-fit: contain;
    display: block;
    @media (min-width: 550px) {
          max-height: 420px;
    }            
  }
</style>