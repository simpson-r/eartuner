'use client';
"use strict";
exports.__esModule = true;
exports.LandingPage = void 0;
var react_1 = require("@chakra-ui/react");
var ExerciseWidget_1 = require("@/features/dashboard/components/ExerciseWidget");
var Layout_1 = require("@/components/layout/Layout");
var FeatureSection_1 = require("@/components/layout/FeatureSection");
var cta = {
    header: 'Choose an exercise to start practicing',
    description: 'Create an account anytime to track your progress.'
};
/**
 * This component renders the EarTuner landing page.
 */
exports.LandingPage = function () {
    return (React.createElement(Layout_1.Layout.PageContainer, { maxW: '5xl' },
        React.createElement(react_1.VStack, { gap: { base: 8, md: 12 } },
            React.createElement(Layout_1.Layout.TitleBlock, { header: cta.header, description: cta.description, align: "center", justifyContent: { base: 'center' }, textAlign: "center" }),
            React.createElement(react_1.Flex, null,
                React.createElement(ExerciseWidget_1.ExerciseWidget, { columns: 2 })),
            React.createElement(FeatureSection_1.FeatureSection, null))));
};
