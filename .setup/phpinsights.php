<?php

declare(strict_types=1);

use NunoMaduro\PhpInsights\Domain\Insights\CyclomaticComplexityIsHigh;
use NunoMaduro\PhpInsights\Domain\Insights\ForbiddenDefineFunctions;
use NunoMaduro\PhpInsights\Domain\Insights\ForbiddenDefineGlobalConstants;
use NunoMaduro\PhpInsights\Domain\Insights\ForbiddenFinalClasses;
use NunoMaduro\PhpInsights\Domain\Insights\ForbiddenGlobals;
use NunoMaduro\PhpInsights\Domain\Insights\ForbiddenNormalClasses;
use NunoMaduro\PhpInsights\Domain\Insights\ForbiddenTraits;
use NunoMaduro\PhpInsights\Domain\Metrics\Architecture\Classes;
use PHP_CodeSniffer\Standards\Generic\Sniffs\Commenting\TodoSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\Files\LineLengthSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\PHP\CharacterBeforePHPOpeningTagSniff;
use PHP_CodeSniffer\Standards\PSR1\Sniffs\Files\SideEffectsSniff;
use PhpCsFixer\Fixer\Basic\BracesFixer;
use PhpCsFixer\Fixer\FunctionNotation\MethodArgumentSpaceFixer;
use SlevomatCodingStandard\Sniffs\Classes\ForbiddenPublicPropertySniff;
use SlevomatCodingStandard\Sniffs\Commenting\InlineDocCommentDeclarationSniff;
use SlevomatCodingStandard\Sniffs\Commenting\UselessFunctionDocCommentSniff;
use SlevomatCodingStandard\Sniffs\ControlStructures\DisallowEmptySniff;
use SlevomatCodingStandard\Sniffs\Functions\FunctionLengthSniff;
use SlevomatCodingStandard\Sniffs\Namespaces\AlphabeticallySortedUsesSniff;
use SlevomatCodingStandard\Sniffs\TypeHints\DeclareStrictTypesSniff;
use SlevomatCodingStandard\Sniffs\TypeHints\DisallowMixedTypeHintSniff;
use SlevomatCodingStandard\Sniffs\TypeHints\ParameterTypeHintSniff;
use SlevomatCodingStandard\Sniffs\TypeHints\PropertyTypeHintSniff;
use SlevomatCodingStandard\Sniffs\TypeHints\ReturnTypeHintSniff;
use SlevomatCodingStandard\Sniffs\TypeHints\UselessConstantTypeHintSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\PHP\GlobalKeywordSniff;
use SlevomatCodingStandard\Sniffs\ControlStructures\DisallowShortTernaryOperatorSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\Classes\ValidClassNameSniff;

return [

  /*
    |--------------------------------------------------------------------------
    | Default Preset
    |--------------------------------------------------------------------------
    |
    | Supported: "default", "laravel", "symfony", "magento2", "drupal", "wordpress"
    |
    */

  'preset' => 'wordpress',

  'ide' => 'vscode',

  'exclude' => [
    'libs',
    'CatalogMetaBox.php',
    'import',
  ],

  'add' => [
    Classes::class => [
      ForbiddenFinalClasses::class,
    ],
  ],

  'remove' => [
    AlphabeticallySortedUsesSniff::class,
    DeclareStrictTypesSniff::class,
    DisallowMixedTypeHintSniff::class,
    ForbiddenDefineFunctions::class,
    ForbiddenNormalClasses::class,
    ForbiddenTraits::class,
    ParameterTypeHintSniff::class,
    PropertyTypeHintSniff::class,
    ReturnTypeHintSniff::class,
    UselessFunctionDocCommentSniff::class,
    UselessConstantTypeHintSniff::class,
    DisallowEmptySniff::class,
    TodoSniff::class,
    InlineDocCommentDeclarationSniff::class,
    ForbiddenPublicPropertySniff::class,
    SideEffectsSniff::class,
    CharacterBeforePHPOpeningTagSniff::class,
    MethodArgumentSpaceFixer::class,
    BracesFixer::class,
    ForbiddenDefineGlobalConstants::class,
    ForbiddenGlobals::class,
    GlobalKeywordSniff::class,
    DisallowShortTernaryOperatorSniff::class,
    ValidClassNameSniff::class,
  ],

  'config' => [
    LineLengthSniff::class => [
      'lineLimit' => 200,           // 120 TODO: Нужно вернуть эти параметры
      'absoluteLineLimit' => 250,   // 140 TODO: Нужно вернуть эти параметры
      'ignoreComments' => true,
    ],

    FunctionLengthSniff::class => [
      'maxLinesLength' => 60,
    ],

    CyclomaticComplexityIsHigh::class => [
      'maxComplexity' => 15,
    ],
  ],

  'requirements' => [
    'min-quality' => 100,
    'min-complexity' => 50,
    'min-architecture' => 100,
    'min-style' => 100,
    'disable-security-check' => false,
  ],

  'threads' => null,

  'timeout' => 60,
];
