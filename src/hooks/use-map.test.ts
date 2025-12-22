import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import leaflet, { Map } from 'leaflet';
import useMap from './use-map';
import { makeFakeCity } from '../utils/mocks';

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn().mockReturnValue({
      setView: vi.fn(),
      remove: vi.fn(),
    }),
    tileLayer: vi.fn().mockReturnValue({
      addTo: vi.fn(),
    }),
    icon: vi.fn(),
    marker: vi.fn(),
  },
}));

describe('Hook: useMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if mapRef is null', () => {
    const mapRef = { current: null };
    const city = makeFakeCity();

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).toBeNull();
    expect(leaflet.map).not.toHaveBeenCalled();
  });

  it('should initialize map when mapRef is valid', () => {
    const mapRef = { current: document.createElement('div') };
    const city = makeFakeCity();

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(leaflet.map).toHaveBeenCalledTimes(1);
    expect(leaflet.map).toHaveBeenCalledWith(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    });
    expect(leaflet.tileLayer).toHaveBeenCalledTimes(1);
    expect(result.current).not.toBeNull();
  });

  it('should update view when city changes', () => {
    const mapRef = { current: document.createElement('div') };
    const city = makeFakeCity();
    const secondCity = {
      ...makeFakeCity(),
      location: { latitude: 10, longitude: 20, zoom: 5 },
      name: 'Hamburg'
    };

    const mapInstanceMock = {
      setView: vi.fn(),
      remove: vi.fn(),
    };

    vi.mocked(leaflet.map).mockReturnValue(mapInstanceMock as unknown as Map);

    const { rerender } = renderHook(
      ({ currentCity }) => useMap(mapRef, currentCity),
      { initialProps: { currentCity: city } }
    );

    expect(leaflet.map).toHaveBeenCalledTimes(1);

    rerender({ currentCity: secondCity });

    expect(mapInstanceMock.setView).toHaveBeenCalledWith(
      [secondCity.location.latitude, secondCity.location.longitude],
      secondCity.location.zoom
    );
  });
});
