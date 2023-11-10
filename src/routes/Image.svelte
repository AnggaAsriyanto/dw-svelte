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

  function generateSrcset(src: any, sizes: string | String, quality: Number, fit: String) {
    const sizeArray = sizes.split(" ");
    const srcsetArray = sizeArray.map(size => {
      const width = size.split(":")[1];
      return `${src}?w=${width}&format=webp&q=${quality}&fit=${fit} ${width}w`;
    });
    return srcsetArray.join(", ");
  }
</script>

<img class="img" srcset={generateSrcset(src, sizes, quality, fit)} src={src} alt={alt} width={width} height={height} loading={loading} title={title}/>

<style>
  .img {
    max-width: 300px;
  }
</style>