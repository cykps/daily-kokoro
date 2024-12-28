<script lang="ts">
	export let html: string;

	const css = `
.midashi_anchor {
  text-decoration: none;
  color: black;
}

h3 {
  font-size: 1.25rem;
  font-weight: bold;
}`;
</script>

<div>
	{@html `${html}<style>${css}</style>`}
</div>
