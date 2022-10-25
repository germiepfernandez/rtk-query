import { Card, createStyles, Grid, Group, Image, Title, Text } from "@mantine/core";
import { useFetchPokemonListQuery } from "../../redux/service";
import { startCase } from "lodash";

const useStyles = createStyles((theme) => ({
	container: {
		display: "flex",
		gap: "10px",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
}));

export const PokemonPage = () => {
	const { classes } = useStyles();

	const { data: pokemonList, isLoading, isFetching } = useFetchPokemonListQuery();

	return (
		<div className={classes.container}>
			<header>
				<Title order={2}>Pokemon List</Title>
			</header>
			<Grid>
				{pokemonList?.map((pokemon) => (
					<Grid.Col key={pokemon.id} span={4}>
						<Card shadow="sm" p="xl">
							<Card.Section>
								<Image src={pokemon.sprites.front_default} alt={pokemon.name} />
							</Card.Section>

							<Text weight={700} size="lg" my="md">
								{startCase(pokemon.name)}
							</Text>

							<Grid>
								{pokemon.stats.map(({ stat, base_stat }) => (
									<Grid.Col span={6} key={stat}>
										<Group spacing="sm">
											<Text weight={600} size="sm" style={{ flex: 1 }}>
												{startCase(stat)}:
											</Text>
											<Text size="sm">{base_stat}</Text>
										</Group>
									</Grid.Col>
								))}
							</Grid>
						</Card>
					</Grid.Col>
				))}
			</Grid>
		</div>
	);
};
