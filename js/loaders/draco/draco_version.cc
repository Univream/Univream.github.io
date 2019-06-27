// If this file is named draco_version.cc.cmake:
// This file is used as input at cmake generation time.

// If this file is named draco_version.cc:
// GENERATED FILE, DO NOT EDIT. SEE ABOVE.
#include "draco_version.h"

static const char kDracoGitHash[] = "c1255f631517069262c36803423070059560a67f";
static const char kDracoGitDesc[] = "unreleased";

const char *draco_git_hash() {
  return kDracoGitHash;
}

const char *draco_git_version() {
  return kDracoGitDesc;
}

const char* draco_version() {
  return draco::Version();
}
