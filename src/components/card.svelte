<script lang="ts">

</script>

<div class="flex flex-col bg-gray-100 rounded-sm border-gray-200 border-solid border-2 w-80">
	<div class="flex flex-1 p-6 justify-between gap-5">
		<div class="flex-row text-center flex-1 justify-center items-center">
			<p class="text-xl font-bold">20/11</p>
			<p class="text-lg">20:20</p>
		</div>
		<div class="border-l-2 border-gray-300" />
		<div class="flex justify-center text-center gap-2 flex-1">
			<div>
				<img
					class="w-16"
					src="https://s.sde.globo.com/media/organizations/2019/07/16/Brasil_rgYHF6Z.svg"
					alt="team_a_flag"
				/>
				<p class="text-lg">BRA</p>
			</div>
			<p class="font-bold">X</p>
			<div>
				<img
					class="w-16"
					src="https://s.sde.globo.com/media/organizations/2019/09/03/França.svg"
					alt="team_b_flag"
				/>
				<p class="text-lg">FRA</p>
			</div>
		</div>
	</div>
	<div class="border-b-2 border-gray-300 border-dotted w-full" />
	<div class="flex p-6 justify-between items-center">
		<div>
			<p class="font-bold">Sua aposta:</p>
			<p>Resultado Final:</p>
		</div>
		<div class="text-center">
			<input
				maxlength="1"
				class="w-4 font-bold text-center bg-transparent"
				placeholder="-"
				type="number"
			/>
			<p>-</p>
		</div>
		<div class="items-center font-bold">X</div>
		<div class="text-center">
			<input class="w-4 font-bold text-center bg-transparent" placeholder="-" type="text" />
			<p>-</p>
		</div>
	</div>
</div>
