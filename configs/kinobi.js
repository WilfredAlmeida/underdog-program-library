const k = require("@metaplex-foundation/kinobi");
let path = require("path");

// Instanciate Kinobi.
const kinobi = k.createFromIdls([
  path.join(__dirname, "..", "idls", "underdog_core.json"),
]);

// Update accounts.
kinobi.update(
  new k.UpdateAccountsVisitor({
    initialOwner: {
      seeds: [k.stringConstantSeed("ownership")],
    },
    orgAccount: {
      seeds: [
        k.stringConstantSeed("org"),
        k.publicKeySeed("superAdminAddress"),
        k.stringSeed("orgId"),
      ],
    },
    orgControlAccount: {
      seeds: [
        k.stringConstantSeed("org-control"),
        k.publicKeySeed("superAdminAddress"),
        k.stringSeed("orgId"),
      ],
    },
    orgMemberAccount: {
      seeds: [
        k.stringConstantSeed("member"),
        k.publicKeySeed("orgAccount"),
        k.publicKeySeed("member"),
      ],
    },
    project: {
      seeds: [
        k.stringSeed("prefix"),
        k.publicKeySeed("orgAccount"),
        k.variableSeed("projectId", k.numberTypeNode("u64")),
      ],
    },
    legacyProject: {
      seeds: [
        k.stringSeed("type"),
        k.publicKeySeed("orgAccount"),
        k.stringSeed("projectId"),
      ],
    },
    projAccount: {
      seeds: [
        k.stringSeed("type"),
        k.publicKeySeed("orgAccount"),
        k.stringSeed("projectId"),
      ],
    },
    compressedProject: {
      seeds: [
        k.stringConstantSeed("c-proj"),
        k.publicKeySeed("orgAccount"),
        k.stringSeed("projectId"),
      ],
    },
    claimAccount: {
      seeds: [
        k.stringConstantSeed("nt-nft-data"),
        k.publicKeySeed("orgAccount"),
        k.stringSeed("projectId"),
        k.stringSeed("nftId"),
      ],
    },
  })
);

kinobi.update(
  new k.SetInstructionAccountDefaultValuesVisitor([
    {
      account: "associatedTokenProgram",
      ignoreIfOptional: true,
      ...k.programDefault(
        "splAssociatedToken",
        "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
      ),
    },
    {
      account: "logWrapper",
      ignoreIfOptional: true,
      ...k.programDefault(
        "splNoop",
        "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV"
      ),
    },
    {
      account: "compressionProgram",
      ignoreIfOptional: true,
      ...k.programDefault(
        "splAccountCompression",
        "cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK"
      ),
    },
    {
      account: "bubblegumProgram",
      ignoreIfOptional: true,
      ...k.programDefault(
        "bubblegumProgram",
        "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY"
      ),
    },
    {
      account: "bubblegumSigner",
      ignoreIfOptional: true,
      ...k.publicKeyDefault("4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK"),
    },
    {
      account: "ownerAccount",
      ignoreIfOptional: true,
      ...k.pdaDefault("initialOwner"),
    },
    {
      account: "orgAccount",
      ignoreIfOptional: true,
      ...k.pdaDefault("orgAccount", {
        seeds: {
          superAdminAddress: k.argDefault("superAdminAddress"),
          orgId: k.argDefault("orgId"),
        },
      }),
    },
    {
      account: "orgControlAccount",
      ignoreIfOptional: true,
      ...k.pdaDefault("orgControlAccount", {
        seeds: {
          superAdminAddress: k.argDefault("superAdminAddress"),
          orgId: k.argDefault("orgId"),
        },
      }),
    },
    {
      account: "memberAccount",
      ignoreIfOptional: true,
      ...k.pdaDefault("orgMemberAccount", {
        seeds: {
          orgAccount: k.accountDefault("orgAccount"),
          member: k.argDefault("memberAddress"),
        },
      }),
    },
    {
      account: "projectAccount",
      ignoreIfOptional: true,
      ...k.pdaDefault("project", {
        seeds: {
          prefix: k.valueDefault(k.vScalar("project")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectId"),
        },
      }),
    },
    {
      account: "projectMint",
      ignoreIfOptional: true,
      ...k.pdaDefault("project", {
        seeds: {
          prefix: k.valueDefault(k.vScalar("project-mint")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectId"),
        },
      }),
    },
    {
      account: "projectVault",
      ignoreIfOptional: true,
      ...k.pdaDefault("project", {
        seeds: {
          prefix: k.valueDefault(k.vScalar("project-vault")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectId"),
        },
      }),
    },
    {
      account: "projectMetadata",
      ignoreIfOptional: true,
      ...k.pdaDefault("metadata", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("projectMint") },
      }),
    },
    {
      account: "projectMasterEdition",
      ignoreIfOptional: true,
      ...k.pdaDefault("masterEdition", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("projectMint") },
      }),
    },
    {
      account: "treeAuthority",
      ...k.pdaDefault("treeConfig", {
        importFrom: "mplBubblegum",
        seeds: { merkleTree: k.accountDefault("merkleTree") },
      }),
    },
    // legacy
    {
      account: "legacyProject",
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.argDefault("projectPrefix"),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "legacyProjectMint",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.argDefault("projectMintPrefix"),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "legacyProjectVault",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.argDefault("projectVaultPrefix"),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "legacyProjectMetadata",
      ignoreIfOptional: true,
      ...k.pdaDefault("metadata", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("legacyProjectMint") },
      }),
    },
    {
      account: "legacyProjectMasterEdition",
      ignoreIfOptional: true,
      ...k.pdaDefault("masterEdition", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("legacyProjectMint") },
      }),
    },
    {
      account: "legacyNftMint",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyNft", {
        importFrom: "../../pdas",
        seeds: {
          prefix: k.argDefault("nftMintPrefix"),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
          nftId: k.argDefault("nftIdStr"),
        },
      }),
    },
    {
      account: "legacyNftMetadata",
      ignoreIfOptional: true,
      ...k.pdaDefault("metadata", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("legacyNftMint") },
      }),
    },
    // compressed
    {
      account: "compressedProject",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.valueDefault(k.vScalar("c-proj")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "compressedProjectMint",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.valueDefault(k.vScalar("c-project-mint")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "compressedProjectVault",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.valueDefault(k.vScalar("c-project-vault")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "compressedProjectMetadata",
      ignoreIfOptional: true,
      ...k.pdaDefault("metadata", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("compressedProjectMint") },
      }),
    },
    {
      account: "compressedProjectMasterEdition",
      ignoreIfOptional: true,
      ...k.pdaDefault("masterEdition", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("compressedProjectMint") },
      }),
    },
    // transferable
    {
      account: "transferableProject",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.valueDefault(k.vScalar("t-proj")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "transferableProjectMint",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.valueDefault(k.vScalar("t-project-mint")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "transferableProjectMetadata",
      ignoreIfOptional: true,
      ...k.pdaDefault("metadata", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("transferableProjectMint") },
      }),
    },
    {
      account: "transferableProjectMasterEdition",
      ignoreIfOptional: true,
      ...k.pdaDefault("masterEdition", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("transferableProjectMint") },
      }),
    },
    {
      account: "transferableNftMint",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyNft", {
        importFrom: "../../pdas",
        seeds: {
          prefix: k.valueDefault(k.vScalar("t-nft-mint")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
          nftId: k.argDefault("nftIdStr"),
        },
      }),
    },
    {
      account: "transferableNftMetadata",
      ignoreIfOptional: true,
      ...k.pdaDefault("metadata", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("transferableNftMint") },
      }),
    },
    {
      account: "transferableNftMasterEdition",
      ignoreIfOptional: true,
      ...k.pdaDefault("masterEdition", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("transferableNftMint") },
      }),
    },
    // non-transferable
    {
      account: "nonTransferableProject",
      ignoreIfOptional: true,
      ...k.pdaDefault("projAccount", {
        seeds: {
          type: k.valueDefault(k.vScalar("nt-proj")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "nonTransferableProjectMint",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyProject", {
        seeds: {
          type: k.valueDefault(k.vScalar("nt-project-mint")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
        },
      }),
    },
    {
      account: "nonTransferableProjectMetadata",
      ignoreIfOptional: true,
      ...k.pdaDefault("metadata", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("nonTransferableProjectMint") },
      }),
    },
    {
      account: "nonTransferableProjectMasterEdition",
      ignoreIfOptional: true,
      ...k.pdaDefault("masterEdition", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("nonTransferableProjectMint") },
      }),
    },
    {
      account: "nonTransferableNftMint",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyNft", {
        importFrom: "../../pdas",
        seeds: {
          prefix: k.valueDefault(k.vScalar("nt-nft-mint")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
          nftId: k.argDefault("nftIdStr"),
        },
      }),
    },
    {
      account: "nonTransferableNftEscrow",
      ignoreIfOptional: true,
      ...k.pdaDefault("legacyNft", {
        importFrom: "../../pdas",
        seeds: {
          prefix: k.valueDefault(k.vScalar("nt-nft-mint-esc")),
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
          nftId: k.argDefault("nftIdStr"),
        },
      }),
    },
    {
      account: "nonTransferableNftClaim",
      ignoreIfOptional: true,
      ...k.pdaDefault("claimAccount", {
        seeds: {
          orgAccount: k.accountDefault("orgAccount"),
          projectId: k.argDefault("projectIdStr"),
          nftId: k.argDefault("nftIdStr"),
        },
      }),
    },
    {
      account: "nonTransferableNftMetadata",
      ignoreIfOptional: true,
      ...k.pdaDefault("metadata", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("nonTransferableNftMint") },
      }),
    },
    {
      account: "nonTransferableNftMasterEdition",
      ignoreIfOptional: true,
      ...k.pdaDefault("masterEdition", {
        importFrom: "mplTokenMetadata",
        seeds: { mint: k.accountDefault("nonTransferableNftMint") },
      }),
    },
  ])
);

const ataPdaDefault = (mint = "mint", owner = "owner") =>
  k.pdaDefault("associatedToken", {
    importFrom: "mplToolbox",
    seeds: { mint: k.accountDefault(mint), owner: k.accountDefault(owner) },
  });

const defaultProjectPrefixArg = {
  projectPrefix: {
    defaultsTo: k.resolverDefault(
      "resolveProjectPrefix",
      [k.dependsOnArg("projectType")],
      {
        importFrom: "../../resolvers",
      }
    ),
  },
};

const defaultProjectMintPrefix = {
  projectMintPrefix: {
    defaultsTo: k.resolverDefault(
      "resolveProjectMintPrefix",
      [k.dependsOnArg("projectType")],
      {
        importFrom: "../../resolvers",
      }
    ),
  },
};

const defaultProjectVaultPrefix = {
  projectVaultPrefix: {
    defaultsTo: k.resolverDefault(
      "resolveProjectVaultPrefix",
      [k.dependsOnArg("projectType")],
      {
        importFrom: "../../resolvers",
      }
    ),
  },
};

const defaultNftMintPrefix = {
  nftMintPrefix: {
    defaultsTo: k.resolverDefault(
      "resolveNftMintPrefix",
      [k.dependsOnArg("projectType")],
      {
        importFrom: "../../resolvers",
      }
    ),
  },
};

const nonTransferableNftDefaults = {
  accounts: {
    claimerTokenAccount: {
      defaultsTo: ataPdaDefault("nonTransferableNftMint", "claimer"),
    },
  },
  args: {
    nftMintBump: {
      defaultsTo: k.accountBumpDefault("nonTransferableNftMint"),
    },
    nftEscrowBump: {
      defaultsTo: k.accountBumpDefault("nonTransferableNftEscrow"),
    },
  },
};

const projectDefaults = {
  args: {
    projectMintBump: {
      defaultsTo: k.accountBumpDefault("projectMint"),
    },
  },
};

kinobi.update(
  new k.UpdateInstructionsVisitor({
    InitializeOrg: {
      accounts: {
        memberAccount: {
          defaultsTo: k.pdaDefault("orgMemberAccount", {
            seeds: {
              orgAccount: k.accountDefault("orgAccount"),
              member: k.argDefault("superAdminAddress"),
            },
          }),
        },
      },
    },
    UpdateProjectV0: projectDefaults,
    MintTransferableNft: {
      accounts: {
        receiverTokenAccount: {
          defaultsTo: ataPdaDefault("transferableNftMint", "receiver"),
        },
      },
      args: {
        projectMintBump: {
          defaultsTo: k.accountBumpDefault("transferableProjectMint"),
        },
      },
    },
    MintNonTransferableNft: {
      args: {
        projectMintBump: {
          defaultsTo: k.accountBumpDefault("nonTransferableProjectMint"),
        },
      },
    },
    ClaimNonTransferableNft: {
      accounts: nonTransferableNftDefaults.accounts,
      args: {
        ...nonTransferableNftDefaults.args,
        projectMintBump: {
          defaultsTo: k.accountBumpDefault("nonTransferableProjectMint"),
        },
      },
    },
    RevokeNonTransferableNft: nonTransferableNftDefaults,
    BurnNonTransferableNft: {
      args: nonTransferableNftDefaults.args,
    },
    InitializeLegacyProject: {
      args: {
        ...defaultProjectPrefixArg,
        ...defaultProjectMintPrefix,
        ...defaultProjectVaultPrefix,
      },
    },
    UpdateNonTransferableNft: {
      args: {
        projectMintBump: {
          defaultsTo: k.accountBumpDefault("nonTransferableProjectMint"),
        },
        nftMintBump: {
          defaultsTo: k.accountBumpDefault("nonTransferableNftMint"),
        },
      },
    },
    VerifyLegacyNftCollection: {
      args: {
        projectMintBump: {
          defaultsTo: k.accountBumpDefault("legacyProjectMint"),
        },
        nftMintBump: {
          defaultsTo: k.accountBumpDefault("legacyNftMint"),
        },
        ...defaultProjectPrefixArg,
        ...defaultProjectMintPrefix,
        ...defaultNftMintPrefix,
      },
    },
    MintNftV2: projectDefaults,
    MintSftV2: projectDefaults,
    MintCompressedNft: {
      args: {
        projectMintBump: {
          defaultsTo: k.accountBumpDefault("compressedProjectMint"),
        },
      },
    },
  })
);

// Custom tree updates.
kinobi.update(
  new k.TransformNodesVisitor([
    {
      // Use extra "proof" arg as remaining accounts.
      selector: (node) =>
        k.isInstructionNode(node) && ["transferAssetV1", "burnAssetV0"].includes(node.name),
      transformer: (node) => {
        k.assertInstructionNode(node);
        return k.instructionNode({
          ...node,
          remainingAccounts: k.remainingAccountsFromArg("proof"),
          argDefaults: {
            ...node.argDefaults,
            proof: k.valueDefault(k.vList([])),
          },
          extraArgs: k.instructionExtraArgsNode({
            ...node.extraArgs,
            struct: k.structTypeNode([
              ...node.extraArgs.struct.fields,
              k.structFieldTypeNode({
                name: "proof",
                child: k.arrayTypeNode(k.publicKeyTypeNode()),
              }),
            ]),
          }),
        });
      },
    },
  ])
);

// Render JavaScript.
const jsDir = path.join(
  __dirname,
  "..",
  "packages",
  "underdog-core-sdk",
  "src",
  "generated"
);

const visitor = new k.RenderJavaScriptVisitor(jsDir, {
  dependencyMap: {
    mplTokenMetadata: "@metaplex-foundation/mpl-token-metadata",
    mplBubblegum: "@metaplex-foundation/mpl-bubblegum",
    mplToolbox: "@metaplex-foundation/mpl-toolbox",
  },
});

kinobi.accept(visitor);
