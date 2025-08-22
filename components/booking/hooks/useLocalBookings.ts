import { useMemo, useState } from 'react';
import { BookingsMap, mergeMaps } from '../lib/bookingsMap';

export function useLocalBookings(serverMap: BookingsMap) {
  const [localAdds, setLocalAdds] = useState<BookingsMap>({});
  const bookingsMap = useMemo(() => mergeMaps(serverMap, localAdds), [serverMap, localAdds]);

  return { bookingsMap, setLocalAdds };
}
