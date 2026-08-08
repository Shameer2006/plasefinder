/**
 * Transforms a raw Firestore map document into a safe client-facing object.
 * Adapted from source — uses Firestore timestamps instead of Mongoose dates.
 */
export default function sendableMap(map, creator, hearted = false, staff = false, isCreator = false) {
  // Handle Firestore Timestamp or JS Date or milliseconds
  let createdAtMs;
  if (map.created_at?.toMillis) {
    // Firestore Timestamp
    createdAtMs = map.created_at.toMillis();
  } else if (map.created_at instanceof Date) {
    createdAtMs = map.created_at.getTime();
  } else if (typeof map.created_at === 'number') {
    createdAtMs = map.created_at;
  } else if (typeof map.created_at === 'string') {
    createdAtMs = new Date(map.created_at).getTime();
  } else {
    createdAtMs = Date.now();
  }

  return {
    created_at: Date.now() - createdAtMs,
    slug: map.slug,
    name: map.name,
    hearts: map.hearts || 0,
    hearted,
    plays: map.plays || 0,
    description_short: map.description_short,
    description_long: (isCreator || staff) ? map.description_long : undefined,
    created_by_name: map.map_creator_name ?? creator?.username,
    id: map.id || map._id,
    in_review: map.in_review || false,
    official: map.official || false,
    accepted: map.accepted || false,
    reject_reason: map.reject_reason,
    resubmittable: map.resubmittable,
    yours: isCreator || staff,
    locations: map.locationsCnt || 0
  };
}
