{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/20.09.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    nodePackages.npm
    chromium
  ];

  # Set CHROME_BIN env variable
  shellHook = ''
    export CHROME_BIN=chromium
  '';
}
