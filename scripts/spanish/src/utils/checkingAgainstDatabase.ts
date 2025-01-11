import { readingLocalJSON } from "./readingLocalJSON";

export async function checkingAgainstDatabase(adjective: Adjective, unknownAdjectives: Adjectives) {

    const localAdjectives: Adjectives = await readingLocalJSON()

    return localAdjectives.some(localAdjective =>
        localAdjective.singular_masculine === adjective.singular_masculine
    );
}