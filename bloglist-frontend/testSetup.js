// Aqui creamos un archivo de configuración para Jest que se ejecutará antes de cada prueba resetesea jsdom el cual simula el navegadir

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';


afterEach(() => {
  cleanup();
});