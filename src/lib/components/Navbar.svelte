<script lang="ts">
	import {
		Collapse,
		NavbarToggler,
		NavbarBrand,
		Nav,
		Navbar,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from '@sveltestrap/sveltestrap';
	import { novelList } from '$lib/novels/dict';
	import { id2Path } from '$lib/novels/util';
	import { serviceName } from '$lib/components/scripts/consts';
  import { base } from '$app/paths';

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail;
	}
</script>

<div class="navbar-outer">
	<Navbar light expand="md" container="sm" class="py-3">
		<NavbarBrand class="fw-bold" href={base === '' ? base : '/'}>{serviceName}</NavbarBrand>
		<NavbarToggler onclick={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ms-auto" navbar>
				<Dropdown nav inNavbar>
					<DropdownToggle nav caret>小説一覧</DropdownToggle>
					<DropdownMenu end>
						{#each novelList as [id, novel]}
							<DropdownItem><NavLink href={id2Path(id)}>{novel.title}</NavLink></DropdownItem>
						{/each}
					</DropdownMenu>
				</Dropdown>
			</Nav>
		</Collapse>
	</Navbar>
</div>

<style>
	.navbar-outer {
		background-color: SlateGrey;
	}
</style>
