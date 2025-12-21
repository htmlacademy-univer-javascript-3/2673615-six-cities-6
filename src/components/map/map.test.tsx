import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { layerGroup, Marker, Map as LeafletMap } from 'leaflet';
import Map from './map';
import useMap from '../../hooks/use-map';
import { makeFakeCity } from '../../utils/mocks';
import { CURRENT_CUSTOM_ICON, DEFAULT_CUSTOM_ICON } from '../../const';
import { Point } from '../../types/map';

vi.mock('../../hooks/use-map');

const mockMapInstance = {
  removeLayer: vi.fn(),
};

const mockLayerGroup = {
  addTo: vi.fn(),
};

const mockMarker = {
  addTo: vi.fn(),
  setIcon: vi.fn(),
};

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');

  return {
    ...actual,
    layerGroup: vi.fn(() => mockLayerGroup),
    Marker: vi.fn(() => mockMarker),
  };
});

describe('Component: Map', () => {
  const mockCity = makeFakeCity();
  const mockPoints: Point[] = [
    { id: '1', lat: 52, lng: 4, title: 'Point 1' },
    { id: '2', lat: 52.1, lng: 4.1, title: 'Point 2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    vi.mocked(useMap).mockReturnValue(null);

    render(
      <Map
        city={mockCity}
        points={mockPoints}
        selectedPoint={null}
      />
    );

    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });

  it('should add markers to the map when map is initialized', () => {
    vi.mocked(useMap).mockReturnValue(mockMapInstance as unknown as LeafletMap);

    render(
      <Map
        city={mockCity}
        points={mockPoints}
        selectedPoint={null}
      />
    );

    expect(layerGroup).toHaveBeenCalled();
    expect(mockLayerGroup.addTo).toHaveBeenCalledWith(mockMapInstance);

    expect(Marker).toHaveBeenCalledTimes(mockPoints.length);
    expect(mockMarker.addTo).toHaveBeenCalledTimes(mockPoints.length);
  });

  it('should set active icon for the selected point', () => {
    vi.mocked(useMap).mockReturnValue(mockMapInstance as unknown as LeafletMap);
    const selectedPoint = mockPoints[0];

    render(
      <Map
        city={mockCity}
        points={mockPoints}
        selectedPoint={selectedPoint}
      />
    );

    expect(mockMarker.setIcon).toHaveBeenCalledTimes(mockPoints.length);
    expect(mockMarker.setIcon).toHaveBeenCalledWith(CURRENT_CUSTOM_ICON);
    expect(mockMarker.setIcon).toHaveBeenCalledWith(DEFAULT_CUSTOM_ICON);
  });
});
